"use client";

import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import type { CareActionType } from "@prisma/client";

import { DiaryModal } from "@/components/dayling/diary-modal";
import { Toast } from "@/components/ui/toast";
import type {
  CareApiResponse,
  CharacterAnimation,
  DiaryApiResponse,
  MainCharacter,
} from "@/features/character/character.types";
import { CareActionButtons } from "@/features/home/care-action-buttons";
import { CharacterStatusBar } from "@/features/home/character-status-bar";

const CharacterCanvas = dynamic(
  () =>
    import("@/features/character/character-canvas").then(
      (module) => module.CharacterCanvas,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="grid h-full min-h-[18rem] w-full place-items-center rounded-[28px] bg-gradient-to-b from-white/90 to-[#FFF2DE]">
        <div className="h-24 w-24 animate-pulse rounded-[45%] bg-[#FF9FB2]" />
      </div>
    ),
  },
);

type ToastState = {
  title: string;
  description?: string;
  tone: "success" | "error" | "info";
};

type HomeViewProps = {
  initialCharacter: MainCharacter;
};

export function HomeView({ initialCharacter }: HomeViewProps) {
  const [character, setCharacter] = useState(initialCharacter);
  const [characterAnimation, setCharacterAnimation] = useState<CharacterAnimation>("idle");
  const [pendingAction, setPendingAction] = useState<CareActionType | null>(null);
  const [diaryOpen, setDiaryOpen] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = useCallback((title: string, description?: string, tone: ToastState["tone"] = "success") => {
    setToast({ title, description, tone });
    window.setTimeout(() => setToast(null), 1800);
  }, []);

  const playCharacterAnimation = useCallback((animation: CharacterAnimation) => {
    setCharacterAnimation(animation);
  }, []);

  const runCareAction = useCallback(
    async (actionType: CareActionType) => {
      if (pendingAction) {
        return;
      }

      setPendingAction(actionType);

      try {
        const response = await fetch("/api/care", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ actionType }),
        });

        const data = (await response.json()) as CareApiResponse;

        if (!data.ok) {
          if (actionType !== "TOUCH") {
            const retryMessage = data.retryAfterMs
              ? `${formatRetryAfter(data.retryAfterMs)} 뒤에 다시 할 수 있어요.`
              : undefined;
            showToast(data.message, retryMessage, "error");
          }

          if (actionType === "TOUCH" && data.error === "CARE_ACTION_COOLDOWN") {
            playCharacterAnimation("happy");
          }

          return;
        }

        setCharacter(data.character);
        playCharacterAnimation(data.animation);

        if (actionType !== "TOUCH") {
          showToast(getCareSuccessTitle(actionType), getCareSuccessDescription(actionType));
        }
      } catch {
        if (actionType !== "TOUCH") {
          showToast("돌봄 액션에 실패했어요", "잠시 후 다시 시도해주세요.", "error");
        }
      } finally {
        setPendingAction(null);
      }
    },
    [pendingAction, playCharacterAnimation, showToast],
  );

  const handleCharacterTap = useCallback(() => {
    void runCareAction("TOUCH");
  }, [runCareAction]);

  const handleDiarySaved = useCallback(
    (response: Extract<DiaryApiResponse, { ok: true }>) => {
      setCharacter(response.character);

      if (response.diary.levelUps > 0) {
        playCharacterAnimation("level-up");
        showToast(
          "레벨 업!",
          `${character.catalog.name}가 Lv. ${response.character.level}이 되었어요.`,
          "success",
        );
        return;
      }

      if (response.diary.grantedExp > 0) {
        showToast("일기를 저장했어요", `EXP ${response.diary.grantedExp}를 얻었어요.`, "success");
        return;
      }

      showToast("일기를 저장했어요", "오늘 EXP는 이미 받았어요.", "info");
    },
    [character.catalog.name, playCharacterAnimation, showToast],
  );

  return (
    <>
      <main className="safe-screen mx-auto grid h-dvh w-full max-w-md grid-rows-[auto_minmax(0,1fr)_auto] bg-[#FFF8F0] px-4 py-3">
        {toast ? (
          <div className="fixed left-1/2 top-[calc(1rem+env(safe-area-inset-top))] z-40 w-[min(22rem,calc(100%-2rem))] -translate-x-1/2">
            <Toast title={toast.title} description={toast.description} tone={toast.tone} />
          </div>
        ) : null}

        <section className="pb-2">
          <CharacterStatusBar character={character} />
        </section>

        <section className="grid min-h-0 place-items-stretch py-2">
          <div className="grid min-h-0 w-full grid-rows-[minmax(0,1fr)_auto] justify-items-center gap-2">
            <CharacterCanvas
              animation={characterAnimation}
              modelUrl={character.catalog.modelUrl}
              onAnimationComplete={() => setCharacterAnimation("idle")}
              onTap={handleCharacterTap}
            />
            <div className="grid gap-0.5 text-center text-xs font-bold text-[#8F7D7D]">
              <p>드래그해서 친구를 돌려보세요</p>
              <p>톡 누르면 기뻐해요</p>
            </div>
          </div>
        </section>

        <CareActionButtons
          pendingAction={pendingAction}
          onFeed={() => void runCareAction("FEED")}
          onWater={() => void runCareAction("WATER")}
          onPet={() => void runCareAction("PET")}
          onDiary={() => setDiaryOpen(true)}
        />
      </main>

      <DiaryModal
        open={diaryOpen}
        onClose={() => setDiaryOpen(false)}
        onSaved={handleDiarySaved}
      />
    </>
  );
}

function getCareSuccessTitle(actionType: CareActionType) {
  switch (actionType) {
    case "FEED":
      return "밥을 먹었어요";
    case "WATER":
      return "물을 마셨어요";
    case "PET":
      return "기분이 좋아졌어요";
    case "TOUCH":
      return "기뻐해요";
  }
}

function getCareSuccessDescription(actionType: CareActionType) {
  switch (actionType) {
    case "FEED":
      return "포만감이 15 올랐어요.";
    case "WATER":
      return "수분이 15 올랐어요.";
    case "PET":
      return "친밀도가 10 올랐어요.";
    case "TOUCH":
      return "친밀도가 1 올랐어요.";
  }
}

function formatRetryAfter(retryAfterMs: number) {
  const totalSeconds = Math.max(1, Math.ceil(retryAfterMs / 1000));

  if (totalSeconds < 60) {
    return `${totalSeconds}초`;
  }

  return `${Math.ceil(totalSeconds / 60)}분`;
}
