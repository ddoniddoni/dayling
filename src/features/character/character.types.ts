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

export type CharacterStatusKey = keyof CharacterStatus;

export type CareActionDefinition = {
  actionType: CareActionType;
  cooldownMs: number;
  animation: CharacterAnimation;
  statusDelta: Partial<Record<CharacterStatusKey, number>>;
};
