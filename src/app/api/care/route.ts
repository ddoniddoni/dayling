import { NextResponse } from "next/server";

import type {
  CareApiErrorCode,
  CareApiResponse,
} from "@/features/character/character.types";
import { serializeMainCharacter } from "@/features/character/character.server";
import { apiError } from "@/lib/api-response";
import { getCurrentUserId } from "@/lib/auth";
import {
  applyCareStatus,
  getCareActionDefinition,
  isCareActionType,
} from "@/lib/care";
import { prisma } from "@/lib/prisma";

function errorResponse(
  error: CareApiErrorCode,
  message: string,
  status: number,
  retryAfterMs?: number,
) {
  return apiError<Extract<CareApiResponse, { ok: false }>>(
    { error, message, retryAfterMs },
    status,
  );
}

export async function POST(request: Request) {
  const userId = await getCurrentUserId();

  if (!userId) {
    return errorResponse("UNAUTHORIZED", "로그인이 필요합니다.", 401);
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return errorResponse(
      "INVALID_ACTION_TYPE",
      "돌봄 액션을 확인해주세요.",
      400,
    );
  }

  const actionType =
    typeof body === "object" && body !== null
      ? Reflect.get(body, "actionType")
      : null;

  if (!isCareActionType(actionType)) {
    return errorResponse(
      "INVALID_ACTION_TYPE",
      "돌봄 액션을 확인해주세요.",
      400,
    );
  }

  const actionDefinition = getCareActionDefinition(actionType);

  const result = await prisma.$transaction(async (tx) => {
    const character = await tx.userCharacter.findFirst({
      where: {
        userId,
        isMain: true,
      },
      include: {
        catalog: true,
      },
    });

    if (!character) {
      return {
        ok: false as const,
        error: "CHARACTER_NOT_FOUND" as const,
        message: "함께하는 친구를 찾을 수 없습니다.",
        status: 404,
      };
    }

    const latestAction = await tx.careActionLog.findFirst({
      where: {
        userId,
        userCharacterId: character.id,
        actionType,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        createdAt: true,
      },
    });

    const now = new Date();
    const elapsedMs = latestAction
      ? now.getTime() - latestAction.createdAt.getTime()
      : Infinity;

    if (elapsedMs < actionDefinition.cooldownMs) {
      const retryAfterMs = actionDefinition.cooldownMs - elapsedMs;

      return {
        ok: false as const,
        error: "CARE_ACTION_COOLDOWN" as const,
        message: "아직 다시 할 수 없어요.",
        status: 429,
        retryAfterMs,
      };
    }

    const updatedStatus = applyCareStatus(
      {
        hunger: character.hunger,
        hydration: character.hydration,
        affection: character.affection,
        energy: character.energy,
      },
      actionType,
    );

    const updatedCharacter = await tx.userCharacter.update({
      where: {
        id: character.id,
      },
      data: updatedStatus,
      include: {
        catalog: true,
      },
    });

    await tx.careActionLog.create({
      data: {
        userId,
        userCharacterId: character.id,
        actionType,
      },
    });

    return {
      ok: true as const,
      character: serializeMainCharacter(updatedCharacter),
      animation: actionDefinition.animation,
      actionType,
    };
  });

  if (!result.ok) {
    return errorResponse(
      result.error,
      result.message,
      result.status,
      result.retryAfterMs,
    );
  }

  return NextResponse.json<CareApiResponse>(result);
}
