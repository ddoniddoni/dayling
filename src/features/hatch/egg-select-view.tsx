"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { EggCard } from "@/components/ui/egg-card";
import { Modal } from "@/components/ui/modal";
import { RarityBadge } from "@/components/ui/rarity-badge";
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
  const [selectedEggId, setSelectedEggId] = useState(eggs[0].id);
  const [open, setOpen] = useState(false);

  return (
    <>
      <main className="safe-screen mx-auto flex w-full max-w-md flex-col bg-[#FFF8F0] px-5 py-6">
        <section className="flex flex-1 flex-col gap-5">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-black leading-tight text-[#3A2E2E]">
              마음에 드는 알을 골라주세요!
            </h1>
            <p className="text-base font-bold text-[#8F7D7D]">
              어떤 친구가 태어날지 몰라요
            </p>
          </div>

          <div className="grid flex-1 content-center gap-3">
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

          <div className="grid gap-3 pb-2">
            <Button type="button">이 알로 시작하기</Button>
            <Button type="button" variant="secondary" onClick={() => setOpen(true)}>
              확률표 보기
            </Button>
          </div>
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
