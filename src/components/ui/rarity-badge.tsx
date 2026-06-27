import type { Rarity } from "@prisma/client";

type RarityBadgeProps = {
  rarity: Rarity;
  className?: string;
};

const rarityClass: Record<Rarity, string> = {
  COMMON: "border-[#CAFFBF] bg-[#F1FFE9] text-[#4E7A40]",
  RARE: "border-[#BDE0FE] bg-[#F1F8FF] text-[#3F6F91]",
  UNIQUE: "border-[#DCC7FF] bg-[#F7F1FF] text-[#7253A8]",
  LEGENDARY: "border-[#FFD6A5] bg-[#FFF4DD] text-[#9A6735]",
};

export function RarityBadge({ rarity, className = "" }: RarityBadgeProps) {
  return (
    <span
      className={`inline-flex min-h-8 items-center rounded-full border px-3 text-xs font-black ${rarityClass[rarity]} ${className}`}
    >
      {rarity}
    </span>
  );
}
