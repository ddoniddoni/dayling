import type { CareActionType } from "@prisma/client";

export type CharacterAnimation = "idle" | "eat" | "drink" | "happy" | "level-up";

export const CARE_COOLDOWN_MS: Record<CareActionType, number> = {
  FEED: 30 * 60 * 1000,
  WATER: 30 * 60 * 1000,
  PET: 10 * 60 * 1000,
  TOUCH: 10 * 1000,
};

export const CARE_ANIMATION: Record<CareActionType, CharacterAnimation> = {
  FEED: "eat",
  WATER: "drink",
  PET: "happy",
  TOUCH: "happy",
};

export function clampStatus(value: number) {
  return Math.max(0, Math.min(100, value));
}

