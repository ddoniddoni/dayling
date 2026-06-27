import { getRequiredExp } from "@/lib/level";
import { prisma } from "@/lib/prisma";

type MainCharacterRecord = {
  id: string;
  level: number;
  exp: number;
  hunger: number;
  hydration: number;
  affection: number;
  energy: number;
  catalog: {
    id: string;
    name: string;
    rarity: "COMMON" | "RARE" | "UNIQUE" | "LEGENDARY";
    probability: number;
    modelUrl: string | null;
    thumbnailUrl: string | null;
  };
};

export function serializeMainCharacter(character: MainCharacterRecord) {
  return {
    id: character.id,
    level: character.level,
    exp: character.exp,
    requiredExp: getRequiredExp(character.level),
    status: {
      hunger: character.hunger,
      hydration: character.hydration,
      affection: character.affection,
      energy: character.energy,
    },
    catalog: {
      id: character.catalog.id,
      name: character.catalog.name,
      rarity: character.catalog.rarity,
      probability: character.catalog.probability,
      modelUrl: character.catalog.modelUrl,
      thumbnailUrl: character.catalog.thumbnailUrl,
    },
  };
}

export async function getMainCharacter(userId: string) {
  const character = await prisma.userCharacter.findFirst({
    where: {
      userId,
      isMain: true,
    },
    include: {
      catalog: true,
    },
  });

  if (!character) {
    return null;
  }

  return serializeMainCharacter(character);
}
