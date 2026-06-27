import type { CareActionType } from "@prisma/client";

import type {
  CareActionDefinition,
  CharacterAnimation,
  CharacterStatus,
  CharacterStatusKey,
} from "@/features/character/character.types";

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

export const CARE_STATUS_DELTA: Record<
  CareActionType,
  Partial<Record<CharacterStatusKey, number>>
> = {
  FEED: { hunger: 18, energy: 4 },
  WATER: { hydration: 18 },
  PET: { affection: 15, energy: -2 },
  TOUCH: { affection: 3 },
};

export const CARE_ACTION_DEFINITIONS: Record<CareActionType, CareActionDefinition> = {
  FEED: {
    actionType: "FEED",
    cooldownMs: CARE_COOLDOWN_MS.FEED,
    animation: CARE_ANIMATION.FEED,
    statusDelta: CARE_STATUS_DELTA.FEED,
  },
  WATER: {
    actionType: "WATER",
    cooldownMs: CARE_COOLDOWN_MS.WATER,
    animation: CARE_ANIMATION.WATER,
    statusDelta: CARE_STATUS_DELTA.WATER,
  },
  PET: {
    actionType: "PET",
    cooldownMs: CARE_COOLDOWN_MS.PET,
    animation: CARE_ANIMATION.PET,
    statusDelta: CARE_STATUS_DELTA.PET,
  },
  TOUCH: {
    actionType: "TOUCH",
    cooldownMs: CARE_COOLDOWN_MS.TOUCH,
    animation: CARE_ANIMATION.TOUCH,
    statusDelta: CARE_STATUS_DELTA.TOUCH,
  },
};

export function clampStatus(value: number) {
  if (!Number.isFinite(value)) {
    throw new Error("Status value must be finite.");
  }

  return Math.max(0, Math.min(100, value));
}

export function applyCareStatus(
  status: CharacterStatus,
  actionType: CareActionType,
): CharacterStatus {
  const delta = CARE_STATUS_DELTA[actionType];

  return {
    hunger: clampStatus(status.hunger + (delta.hunger ?? 0)),
    hydration: clampStatus(status.hydration + (delta.hydration ?? 0)),
    affection: clampStatus(status.affection + (delta.affection ?? 0)),
    energy: clampStatus(status.energy + (delta.energy ?? 0)),
  };
}

export function getCareActionDefinition(actionType: CareActionType) {
  return CARE_ACTION_DEFINITIONS[actionType];
}
