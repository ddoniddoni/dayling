"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { EggCard } from "@/components/ui/egg-card";
import { Modal } from "@/components/ui/modal";
import { RarityBadge } from "@/components/ui/rarity-badge";
import type { HatchResponse } from "@/features/hatch/hatch.types";
import type { Rarity } from "@prisma/client";

const eggs = [
  { id: "basic_egg_01", label: "포근한 알", tone: "pink" as const },
  { id: "basic_egg_02", label: "구름빛 알", tone: "blue" as const },
  { id: "basic_egg_03", label: "새싹 알", tone: "green" as const },
];

const probabilities: Array<{ rarity: Rarity; value: string }> = [
  { rarity: "COMMON", value: "80%" },
  { rarity: "RARE", value: "15%" },
  { rarity: "UNIQUE", value: "4%" },
  { rarity: "LEGENDARY", value: "1%" },
];

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
      const response = await fetch("/api/hatch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ eggType: selectedEggId }),
      });

      const data = (await response.json()) as HatchResponse;

      if (!data.ok) {
        setError(data.message);
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
    } finally {
      setIsHatching(false);
    }
  }

  return (
    <>
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
                onSelect={() => setSelectedEggId(egg.id)}
              />
            ))}
          </div>
        </section>

        <section className="grid gap-3 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
          {error ? (
            <p role="alert" className="rounded-[18px] bg-[#FFF0F3] px-4 py-3 text-sm font-black text-[#9A5361]">
              {error}
            </p>
          ) : null}
          <Button type="button" onClick={startHatch} disabled={isHatching} className="min-h-14">
            {isHatching ? "부화 중..." : "이 알로 시작하기"}
          </Button>
          <Button type="button" variant="secondary" onClick={() => setOpen(true)}>
            확률표 보기
          </Button>
        </section>
      </main>

      <Modal title="부화 확률표" open={open} onClose={() => setOpen(false)}>
        <div className="grid gap-3">
          {probabilities.map((item) => (
            <div
              key={item.rarity}
              className="flex items-center justify-between rounded-[20px] bg-[#FFF8F0] p-3"
            >
              <RarityBadge rarity={item.rarity} />
              <span className="text-lg font-black text-[#3A2E2E]">{item.value}</span>
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
}
