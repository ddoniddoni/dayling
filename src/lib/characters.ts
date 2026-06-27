import type { Rarity } from "@prisma/client";

export type CharacterSeed = {
  id: string;
  name: string;
  rarity: Rarity;
  probability: number;
  modelUrl?: string | null;
  thumbnailUrl?: string | null;
};

export const CHARACTER_CATALOG: CharacterSeed[] = [
  { id: "common_01", name: "몽실이", rarity: "COMMON", probability: 8 },
  { id: "common_02", name: "포리", rarity: "COMMON", probability: 8 },
  { id: "common_03", name: "두두", rarity: "COMMON", probability: 8 },
  { id: "common_04", name: "코코", rarity: "COMMON", probability: 8 },
  { id: "common_05", name: "밀키", rarity: "COMMON", probability: 8 },
  { id: "common_06", name: "뭉치", rarity: "COMMON", probability: 8 },
  { id: "common_07", name: "토리", rarity: "COMMON", probability: 8 },
  { id: "common_08", name: "보리", rarity: "COMMON", probability: 8 },
  { id: "common_09", name: "루루", rarity: "COMMON", probability: 8 },
  { id: "common_10", name: "나나", rarity: "COMMON", probability: 8 },
  { id: "rare_01", name: "반짝토끼", rarity: "RARE", probability: 5 },
  { id: "rare_02", name: "구름냥이", rarity: "RARE", probability: 5 },
  { id: "rare_03", name: "별빛펭귄", rarity: "RARE", probability: 5 },
  { id: "unique_01", name: "달빛여우", rarity: "UNIQUE", probability: 4 },
  {
    id: "legendary_01",
    name: "오로라드래곤",
    rarity: "LEGENDARY",
    probability: 1,
  },
];

