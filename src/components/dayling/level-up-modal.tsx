"use client";

import { CharacterPlaceholder } from "@/components/dayling/character-placeholder";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

type LevelUpModalProps = {
  open: boolean;
  onClose: () => void;
};

export function LevelUpModal({ open, onClose }: LevelUpModalProps) {
  return (
    <Modal title="레벨 업!" open={open} onClose={onClose}>
      <div className="grid justify-items-center gap-4 text-center">
        <CharacterPlaceholder size="md" />
        <div className="space-y-2">
          <p className="text-2xl font-black text-[#3A2E2E]">몽실이가 더 자랐어요</p>
          <p className="text-sm leading-6 text-[#8F7D7D]">
            일기를 꾸준히 쓰면 친구가 조금씩 새로운 모습을 보여줘요.
          </p>
        </div>
        <Button type="button" onClick={onClose} className="w-full">
          좋아요
        </Button>
      </div>
    </Modal>
  );
}
