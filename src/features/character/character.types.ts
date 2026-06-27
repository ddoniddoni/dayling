import type { CareActionType, Rarity } from "@prisma/client";

export type { CareActionType, Rarity };

export type CharacterAnimation = "idle" | "eat" | "drink" | "happy" | "level-up";

export type CharacterStatus = {
  hunger: number;
  hydration: number;
  affection: number;
  energy: number;
};

export type CharacterCatalog = {
  id: string;
  name: string;
  rarity: Rarity;
  probability: number;
  modelUrl: string | null;
  thumbnailUrl: string | null;
};

export type UserCharacter = CharacterStatus & {
  id: string;
  userId: string;
  characterCatalogId: string;
  isMain: boolean;
  catalog: CharacterCatalog;
  level: number;
  exp: number;
  requiredExp: number;
};

export type MainCharacter = {
  id: string;
  level: number;
  exp: number;
  requiredExp: number;
  status: CharacterStatus;
  catalog: CharacterCatalog;
};

export type CharacterApiErrorCode = "UNAUTHORIZED" | "CHARACTER_NOT_FOUND";

export type CharacterApiResponse =
  | {
      ok: true;
      character: MainCharacter;
    }
  | {
      ok: false;
      error: CharacterApiErrorCode;
      message: string;
    };

export type CharacterStatusKey = keyof CharacterStatus;

export type CareActionDefinition = {
  actionType: CareActionType;
  cooldownMs: number;
  animation: CharacterAnimation;
  statusDelta: Partial<Record<CharacterStatusKey, number>>;
};

export type CareApiErrorCode =
  | "UNAUTHORIZED"
  | "CHARACTER_NOT_FOUND"
  | "INVALID_ACTION_TYPE"
  | "CARE_ACTION_COOLDOWN";

export type CareApiResponse =
  | {
      ok: true;
      character: MainCharacter;
      animation: CharacterAnimation;
      actionType: CareActionType;
    }
  | {
      ok: false;
      error: CareApiErrorCode;
      message: string;
      retryAfterMs?: number;
    };

export type DiaryApiErrorCode =
  | "UNAUTHORIZED"
  | "CHARACTER_NOT_FOUND"
  | "INVALID_DIARY_CONTENT"
  | "INVALID_DIARY_LINE_COUNT";

export type DiaryApiResponse =
  | {
      ok: true;
      character: MainCharacter;
      diary: {
        id: string;
        lineCount: number;
        grantedExp: number;
        levelUps: number;
        expAlreadyGrantedToday: boolean;
        isFirstDiary: boolean;
      };
    }
  | {
      ok: false;
      error: DiaryApiErrorCode;
      message: string;
      lineCount?: number;
    };
