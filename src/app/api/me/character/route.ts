import { NextResponse } from "next/server";

import type {
  CharacterApiErrorCode,
  CharacterApiResponse,
} from "@/features/character/character.types";
import { getMainCharacter } from "@/features/character/character.server";
import { apiError } from "@/lib/api-response";
import { getCurrentUserId } from "@/lib/auth";

function errorResponse(
  error: CharacterApiErrorCode,
  message: string,
  status: number,
) {
  return apiError<Extract<CharacterApiResponse, { ok: false }>>(
    { error, message },
    status,
  );
}

export async function GET() {
  const userId = await getCurrentUserId();

  if (!userId) {
    return errorResponse("UNAUTHORIZED", "로그인이 필요합니다.", 401);
  }

  const character = await getMainCharacter(userId);

  if (!character) {
    return errorResponse(
      "CHARACTER_NOT_FOUND",
      "함께하는 친구를 찾을 수 없습니다.",
      404,
    );
  }

  return NextResponse.json<CharacterApiResponse>({
    ok: true,
    character,
  });
}
