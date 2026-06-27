import type { Rarity } from "@prisma/client";

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
  catalog: CharacterCatalog;
  level: number;
  exp: number;
  requiredExp: number;
};

