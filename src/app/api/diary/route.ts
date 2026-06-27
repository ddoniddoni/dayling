import { NextResponse } from "next/server";

import type { DiaryApiErrorCode, DiaryApiResponse } from "@/features/character/character.types";
import { serializeMainCharacter } from "@/features/character/character.server";
import { getCurrentUserId } from "@/lib/auth";
import {
  countNonEmptyDiaryLines,
  getDiaryGrantedExp,
  getLocalDayRange,
  isValidDiaryContent,
} from "@/lib/diary";
import { applyExp } from "@/lib/level";
import { prisma } from "@/lib/prisma";

function errorResponse(
  error: DiaryApiErrorCode,
  message: string,
  status: number,
  lineCount?: number,
) {
  return NextResponse.json<DiaryApiResponse>(
    { ok: false, error, message, lineCount },
    { status },
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
    return errorResponse("INVALID_DIARY_CONTENT", "일기 내용을 확인해주세요.", 400);
  }

  const content = typeof body === "object" && body !== null ? Reflect.get(body, "content") : null;

  if (typeof content !== "string" || content.trim().length === 0) {
    return errorResponse("INVALID_DIARY_CONTENT", "일기 내용을 입력해주세요.", 400);
  }

  const lineCount = countNonEmptyDiaryLines(content);

  if (!isValidDiaryContent(content)) {
    return errorResponse(
      "INVALID_DIARY_LINE_COUNT",
      "일기는 빈 줄을 제외하고 3줄 이상이어야 해요.",
      400,
      lineCount,
    );
  }

  const { start, end } = getLocalDayRange();

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

    const [firstDiary, todayExpDiary] = await Promise.all([
      tx.diaryEntry.findFirst({
        where: {
          userId,
        },
        select: {
          id: true,
        },
      }),
      tx.diaryEntry.findFirst({
        where: {
          userId,
          grantedExp: {
            gt: 0,
          },
          createdAt: {
            gte: start,
            lt: end,
          },
        },
        select: {
          id: true,
        },
      }),
    ]);

    const isFirstDiary = !firstDiary;
    const canGrantDailyExp = !todayExpDiary;
    const grantedExp = getDiaryGrantedExp({ isFirstDiary, canGrantDailyExp });
    const nextExp = applyExp(
      {
        level: character.level,
        exp: character.exp,
      },
      grantedExp,
    );

    const diaryEntry = await tx.diaryEntry.create({
      data: {
        userId,
        userCharacterId: character.id,
        content,
        grantedExp,
      },
      select: {
        id: true,
      },
    });

    const updatedCharacter = grantedExp
      ? await tx.userCharacter.update({
          where: {
            id: character.id,
          },
          data: {
            level: nextExp.level,
            exp: nextExp.exp,
          },
          include: {
            catalog: true,
          },
        })
      : character;

    return {
      ok: true as const,
      character: serializeMainCharacter(updatedCharacter),
      diary: {
        id: diaryEntry.id,
        lineCount,
        grantedExp,
        levelUps: nextExp.levelUps,
        expAlreadyGrantedToday: !canGrantDailyExp,
        isFirstDiary,
      },
    };
  });

  if (!result.ok) {
    return errorResponse(result.error, result.message, result.status);
  }

  return NextResponse.json<DiaryApiResponse>(result);
}
