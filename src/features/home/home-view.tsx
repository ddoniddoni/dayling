"use client";

import { useState } from "react";

import { CharacterPlaceholder } from "@/components/dayling/character-placeholder";
import { DiaryModal } from "@/components/dayling/diary-modal";
import { LevelUpModal } from "@/components/dayling/level-up-modal";
import { BottomActionButton } from "@/components/ui/bottom-action-button";
import { Card } from "@/components/ui/card";
import { ExpProgress } from "@/components/ui/exp-progress";
import { RarityBadge } from "@/components/ui/rarity-badge";
import { StatusChip } from "@/components/ui/status-chip";
import { Toast } from "@/components/ui/toast";

const mockCharacter = {
  name: "몽실이",
  level: 3,
  exp: 45,
  requiredExp: 100,
  rarity: "COMMON" as const,
  status: {
    hunger: 82,
    hydration: 76,
    affection: 91,
    energy: 68,
  },
};

type ToastState = {
  title: string;
  description?: string;
};

export function HomeView() {
  const [diaryOpen, setDiaryOpen] = useState(false);
  const [levelUpOpen, setLevelUpOpen] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  function showToast(title: string, description?: string) {
    setToast({ title, description });
    window.setTimeout(() => setToast(null), 1800);
  }

  return (
    <>
      <main className="safe-screen mx-auto grid h-dvh w-full max-w-md grid-rows-[auto_minmax(0,1fr)_auto] bg-[#FFF8F0] px-4 py-3">
        {toast ? (
          <div className="fixed left-1/2 top-[calc(1rem+env(safe-area-inset-top))] z-40 w-[min(22rem,calc(100%-2rem))] -translate-x-1/2">
            <Toast title={toast.title} description={toast.description} tone="success" />
          </div>
        ) : null}

        <section className="pb-2">
          <Card className="p-3">
            <div className="mb-2 flex items-start justify-between gap-3">
              <div>
                <h1 className="text-xl font-black leading-tight text-[#3A2E2E]">
                  {mockCharacter.name} Lv. {mockCharacter.level}
                </h1>
                <p className="text-sm font-bold text-[#8F7D7D]">
                  EXP {mockCharacter.exp} / {mockCharacter.requiredExp}
                </p>
              </div>
              <RarityBadge rarity={mockCharacter.rarity} />
            </div>

            <ExpProgress current={mockCharacter.exp} required={mockCharacter.requiredExp} />

            <div className="mt-3 grid grid-cols-4 gap-1.5">
              <StatusChip label="포만감" value={mockCharacter.status.hunger} tone="peach" />
              <StatusChip label="수분" value={mockCharacter.status.hydration} tone="blue" />
              <StatusChip label="친밀도" value={mockCharacter.status.affection} tone="pink" />
              <StatusChip label="에너지" value={mockCharacter.status.energy} tone="green" />
            </div>
          </Card>
        </section>

        <section className="grid min-h-0 place-items-stretch py-2">
          <div className="grid min-h-0 w-full grid-rows-[minmax(0,1fr)_auto] justify-items-center gap-2">
            <div
              role="button"
              tabIndex={0}
              onClick={() => showToast("몽실이가 기뻐해요", "톡 누르면 happy 애니메이션이 재생돼요.")}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  showToast("몽실이가 기뻐해요", "톡 누르면 happy 애니메이션이 재생돼요.");
                }
              }}
              className="grid min-h-0 w-full place-items-center overflow-hidden rounded-[28px] bg-gradient-to-b from-white/90 to-[#FFF2DE] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.8)] outline-none"
            >
              <CharacterPlaceholder size="md" />
            </div>
            <div className="grid gap-0.5 text-center text-xs font-bold text-[#8F7D7D]">
              <p>드래그해서 친구를 돌려보세요</p>
              <p>톡 누르면 기뻐해요</p>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-4 gap-2 rounded-t-[28px] bg-white/70 px-1 pb-[calc(0.25rem+env(safe-area-inset-bottom))] pt-2 shadow-[0_-12px_28px_rgba(255,159,178,0.12)]">
          <BottomActionButton
            icon="밥"
            label="밥주기"
            tone="peach"
            onClick={() => showToast("밥을 먹었어요", "포만감이 조금 올랐어요.")}
          />
          <BottomActionButton
            icon="물"
            label="물주기"
            tone="blue"
            onClick={() => showToast("물을 마셨어요", "수분이 조금 올랐어요.")}
          />
          <BottomActionButton
            icon="손"
            label="쓰다듬기"
            tone="pink"
            onClick={() => setLevelUpOpen(true)}
          />
          <BottomActionButton
            icon="일"
            label="일기쓰기"
            tone="green"
            onClick={() => setDiaryOpen(true)}
          />
        </section>
      </main>

      <DiaryModal open={diaryOpen} onClose={() => setDiaryOpen(false)} />
      <LevelUpModal open={levelUpOpen} onClose={() => setLevelUpOpen(false)} />
    </>
  );
}
