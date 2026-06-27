import Link from "next/link";
import { redirect } from "next/navigation";

import { CharacterPlaceholder } from "@/components/dayling/character-placeholder";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RarityBadge } from "@/components/ui/rarity-badge";
import { getCurrentUserId, getPostLoginPath } from "@/lib/auth";
import type { Rarity } from "@prisma/client";

const rarities = ["COMMON", "RARE", "UNIQUE", "LEGENDARY"] as const;

function isRarity(value: string | undefined): value is Rarity {
  return rarities.includes(value as Rarity);
}

type HatchResultPageProps = {
  searchParams: Promise<{
    name?: string;
    rarity?: string;
    probability?: string;
  }>;
};

export default async function HatchResultPage({ searchParams }: HatchResultPageProps) {
  const userId = await getCurrentUserId();

  if (!userId) {
    redirect("/login");
  }

  const params = await searchParams;
  const name = params.name;
  const probability = Number(params.probability);

  if (!name || !isRarity(params.rarity) || !Number.isFinite(probability)) {
    redirect(await getPostLoginPath(userId));
  }

  return (
    <main className="safe-screen mx-auto flex w-full max-w-md flex-col bg-[#FFF8F0] px-5 py-6">
      <section className="flex flex-1 flex-col justify-between gap-6">
        <div className="space-y-2 text-center">
          <p className="text-sm font-black text-[#9A5361]">부화 완료</p>
          <h1 className="text-3xl font-black leading-tight text-[#3A2E2E]">
            새로운 친구가 태어났어요!
          </h1>
        </div>

        <div className="grid flex-1 place-items-center">
          <div className="grid justify-items-center gap-4">
            <CharacterPlaceholder />
            <Card className="w-full p-5 text-center">
              <div className="grid justify-items-center gap-3">
                <RarityBadge rarity={params.rarity} />
                <div>
                  <h2 className="text-3xl font-black text-[#3A2E2E]">{name}</h2>
                  <p className="mt-1 text-sm font-bold text-[#8F7D7D]">
                    획득 확률 {probability}%
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <Link href="/home">
          <Button type="button" className="w-full">
            키우러 가기
          </Button>
        </Link>
      </section>
    </main>
  );
}
