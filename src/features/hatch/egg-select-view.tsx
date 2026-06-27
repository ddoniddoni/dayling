"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { EggCard } from "@/components/ui/egg-card";
import { Modal } from "@/components/ui/modal";
import { RarityBadge } from "@/components/ui/rarity-badge";
import { HatchAnimation } from "@/features/hatch/hatch-animation";
import type { HatchResponse } from "@/features/hatch/hatch.types";
import { CHARACTER_CATALOG } from "@/lib/characters";
import type { Rarity } from "@prisma/client";

const eggs = [
  { id: "basic_egg_01", label: "포근한 알", tone: "pink" as const },
  { id: "basic_egg_02", label: "구름빛 알", tone: "blue" as const },
  { id: "basic_egg_03", label: "새싹 알", tone: "green" as const },
];

const raritySummaries: Array<{
  rarity: Rarity;
  count: number;
  totalProbability: string;
  perCharacter: string;
}> = [
  {
    rarity: "COMMON",
    count: 10,
    totalProbability: "80%",
    perCharacter: "각 8%",
  },
  { rarity: "RARE", count: 3, totalProbability: "15%", perCharacter: "각 5%" },
  { rarity: "UNIQUE", count: 1, totalProbability: "4%", perCharacter: "4%" },
  { rarity: "LEGENDARY", count: 1, totalProbability: "1%", perCharacter: "1%" },
];

const hatchDelayMs = 900;

function wait(ms: number) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

export function EggSelectView() {
  const router = useRouter();
  const [selectedEggId, setSelectedEggId] = useState(eggs[0].id);
  const [open, setOpen] = useState(false);
  const [isHatching, setIsHatching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function startHatch() {
    if (isHatching) {
      return;
    }

    setIsHatching(true);
    setError(null);

    try {
      const [response] = await Promise.all([
        fetch("/api/hatch", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ eggType: selectedEggId }),
        }),
        wait(hatchDelayMs),
      ]);

      const data = (await response.json()) as HatchResponse;

      if (!data.ok) {
        setError(data.message);
        setIsHatching(false);
        return;
      }

      const params = new URLSearchParams({
        name: data.character.name,
        rarity: data.character.rarity,
        probability: String(data.character.probability),
      });

      router.push(`/onboarding/result?${params.toString()}`);
      router.refresh();
    } catch {
      setError("부화 요청 중 문제가 발생했습니다.");
      setIsHatching(false);
    }
  }

  const selectedEgg = eggs.find((egg) => egg.id === selectedEggId) ?? eggs[0];

  return (
    <>
      {isHatching ? <HatchAnimation eggLabel={selectedEgg.label} /> : null}

      <main className="safe-screen mx-auto grid h-dvh w-full max-w-md grid-rows-[auto_1fr_auto] bg-[#FFF8F0] px-4 py-4">
        <section className="pt-2">
          <div className="space-y-1 text-center">
            <h1 className="text-3xl font-black leading-tight text-[#3A2E2E]">
              마음에 드는 알을 골라주세요!
            </h1>
            <p className="text-base font-bold text-[#8F7D7D]">
              어떤 친구가 태어날지 몰라요
            </p>
          </div>
        </section>

        <section className="grid min-h-0 content-center py-4">
          <div className="grid grid-cols-3 gap-3">
            {eggs.map((egg) => (
              <EggCard
                key={egg.id}
                label={egg.label}
                tone={egg.tone}
                selected={egg.id === selectedEggId}
                disabled={isHatching}
                onSelect={() => setSelectedEggId(egg.id)}
              />
            ))}
          </div>
        </section>

        <section className="grid gap-3 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
          {error ? (
            <p
              role="alert"
              className="rounded-[18px] bg-[#FFF0F3] px-4 py-3 text-sm font-black text-[#9A5361]"
            >
              {error}
            </p>
          ) : null}
          <Button
            type="button"
            onClick={startHatch}
            disabled={isHatching}
            className="min-h-14"
          >
            {isHatching ? "부화 중..." : "이 알로 시작하기"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => setOpen(true)}
          >
            확률표 보기
          </Button>
        </section>
      </main>

      <Modal title="부화 확률표" open={open} onClose={() => setOpen(false)}>
        <div className="grid max-h-[70dvh] gap-5 overflow-y-auto pr-1">
          <p className="rounded-[18px] bg-[#FFF8F0] px-4 py-3 text-sm font-bold leading-6 text-[#8F7D7D]">
            확률은 서버에서 계산됩니다. 선택한 알의 외형은 다르지만 MVP에서는
            모두 같은 확률을 사용해요.
          </p>

          <section
            className="grid gap-2"
            aria-labelledby="rarity-probability-title"
          >
            <h3
              id="rarity-probability-title"
              className="text-sm font-black text-[#3A2E2E]"
            >
              등급별 확률
            </h3>
            <div className="grid gap-2">
              {raritySummaries.map((item) => (
                <div
                  key={item.rarity}
                  className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-[18px] bg-[#FFF8F0] p-3"
                >
                  <div className="grid gap-1">
                    <RarityBadge rarity={item.rarity} />
                    <span className="text-xs font-bold text-[#8F7D7D]">
                      {item.count}종 / 캐릭터별 {item.perCharacter}
                    </span>
                  </div>
                  <span className="text-lg font-black text-[#3A2E2E]">
                    {item.totalProbability}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section
            className="grid gap-2"
            aria-labelledby="character-probability-title"
          >
            <h3
              id="character-probability-title"
              className="text-sm font-black text-[#3A2E2E]"
            >
              캐릭터별 확률
            </h3>
            <div className="grid gap-2">
              {CHARACTER_CATALOG.map((character) => (
                <div
                  key={character.id}
                  className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-[18px] border border-[#FFE8D1] bg-white p-3"
                >
                  <div className="min-w-0">
                    <div className="truncate text-base font-black text-[#3A2E2E]">
                      {character.name}
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <RarityBadge rarity={character.rarity} />
                      <span className="text-xs font-bold text-[#8F7D7D]">
                        {character.id}
                      </span>
                    </div>
                  </div>
                  <span className="rounded-full bg-[#FFF8F0] px-3 py-1 text-sm font-black text-[#9A5361]">
                    {character.probability}%
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </Modal>
    </>
  );
}
