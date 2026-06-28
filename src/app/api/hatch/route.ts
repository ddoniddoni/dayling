import { NextResponse } from "next/server";

import {
  isEggType,
  type HatchErrorCode,
  type HatchErrorResponse,
  type HatchResponse,
} from "@/features/hatch/hatch.types";
import { apiError } from "@/lib/api-response";
import { getCurrentUserId } from "@/lib/auth";
import { pickWeightedCharacter } from "@/lib/probability";
import { prisma } from "@/lib/prisma";

function errorResponse(error: HatchErrorCode, message: string, status: number) {
  return apiError<HatchErrorResponse>({ error, message }, status);
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
    return errorResponse("INVALID_EGG_TYPE", "알 정보를 확인해주세요.", 400);
  }

  const eggType =
    typeof body === "object" && body !== null
      ? Reflect.get(body, "eggType")
      : null;

  if (!isEggType(eggType)) {
    return errorResponse("INVALID_EGG_TYPE", "알 정보를 확인해주세요.", 400);
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      const existingCharacter = await tx.userCharacter.findFirst({
        where: {
          userId,
          isMain: true,
        },
        select: {
          id: true,
        },
      });

      if (existingCharacter) {
        return {
          ok: false as const,
          error: "CHARACTER_ALREADY_EXISTS" as const,
          message: "이미 함께하는 친구가 있습니다.",
          status: 409,
        };
      }

      const characters = await tx.characterCatalog.findMany({
        where: {
          isActive: true,
        },
        orderBy: {
          id: "asc",
        },
      });

      if (characters.length === 0) {
        return {
          ok: false as const,
          error: "CHARACTER_NOT_FOUND" as const,
          message: "부화 가능한 친구가 없습니다.",
          status: 404,
        };
      }

      let selectedCharacter: (typeof characters)[number];

      try {
        selectedCharacter = pickWeightedCharacter(characters);
      } catch {
        return {
          ok: false as const,
          error: "PROBABILITY_TABLE_INVALID" as const,
          message: "확률표 설정을 확인해주세요.",
          status: 500,
        };
      }

      const userCharacter = await tx.userCharacter.create({
        data: {
          userId,
          characterCatalogId: selectedCharacter.id,
          isMain: true,
        },
        select: {
          id: true,
        },
      });

      await tx.eggHatch.create({
        data: {
          userId,
          characterCatalogId: selectedCharacter.id,
          eggType,
          probability: selectedCharacter.probability,
        },
      });

      return {
        ok: true as const,
        character: {
          id: selectedCharacter.id,
          userCharacterId: userCharacter.id,
          name: selectedCharacter.name,
          rarity: selectedCharacter.rarity,
          probability: selectedCharacter.probability,
          modelUrl: selectedCharacter.modelUrl,
          thumbnailUrl: selectedCharacter.thumbnailUrl,
        },
      };
    });

    if (!result.ok) {
      return errorResponse(result.error, result.message, result.status);
    }

    return NextResponse.json<HatchResponse>(result);
  } catch {
    return errorResponse(
      "PROBABILITY_TABLE_INVALID",
      "부화 처리 중 문제가 발생했습니다.",
      500,
    );
  }
}
