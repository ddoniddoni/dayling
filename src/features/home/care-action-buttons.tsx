import type { CareActionType } from "@prisma/client";

import { BottomActionButton } from "@/components/ui/bottom-action-button";

type CareActionButtonsProps = {
  onFeed: () => void;
  onWater: () => void;
  onPet: () => void;
  onDiary: () => void;
  pendingAction: CareActionType | null;
};

export function CareActionButtons({
  onFeed,
  onWater,
  onPet,
  onDiary,
  pendingAction,
}: CareActionButtonsProps) {
  const careActionPending = pendingAction !== null;

  return (
    <section className="grid grid-cols-4 gap-2 rounded-t-[28px] bg-white/70 px-1 pb-[calc(0.25rem+env(safe-area-inset-bottom))] pt-2 shadow-[0_-12px_28px_rgba(255,159,178,0.12)]">
      <BottomActionButton
        icon="밥"
        label={pendingAction === "FEED" ? "처리중" : "밥주기"}
        tone="peach"
        onClick={onFeed}
        disabled={careActionPending}
      />
      <BottomActionButton
        icon="물"
        label={pendingAction === "WATER" ? "처리중" : "물주기"}
        tone="blue"
        onClick={onWater}
        disabled={careActionPending}
      />
      <BottomActionButton
        icon="손"
        label={pendingAction === "PET" ? "처리중" : "쓰다듬기"}
        tone="pink"
        onClick={onPet}
        disabled={careActionPending}
      />
      <BottomActionButton
        icon="일"
        label="일기쓰기"
        tone="green"
        onClick={onDiary}
        disabled={careActionPending}
      />
    </section>
  );
}
