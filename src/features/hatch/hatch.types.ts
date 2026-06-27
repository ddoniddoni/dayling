import type { Rarity } from "@prisma/client";

export const EGG_TYPES = ["basic_egg_01", "basic_egg_02", "basic_egg_03"] as const;

export type EggType = (typeof EGG_TYPES)[number];

export function isEggType(value: unknown): value is EggType {
  return typeof value === "string" && EGG_TYPES.includes(value as EggType);
}

export type HatchSuccessResponse = {
  ok: true;
  character: {
    id: string;
    userCharacterId: string;
    name: string;
    rarity: Rarity;
    probability: number;
    modelUrl: string | null;
    thumbnailUrl: string | null;
  };
};

export type HatchErrorCode =
  | "UNAUTHORIZED"
  | "INVALID_EGG_TYPE"
  | "CHARACTER_ALREADY_EXISTS"
  | "CHARACTER_NOT_FOUND"
  | "PROBABILITY_TABLE_INVALID";

export type HatchErrorResponse = {
  ok: false;
  error: HatchErrorCode;
  message: string;
};

export type HatchResponse = HatchSuccessResponse | HatchErrorResponse;
