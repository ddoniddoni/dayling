"use client";

import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

type DiaryModalProps = {
  open: boolean;
  onClose: () => void;
};

export function DiaryModal({ open, onClose }: DiaryModalProps) {
  return (
    <Modal title="오늘의 일기" open={open} onClose={onClose}>
      <form className="grid gap-4">
        <textarea
          rows={6}
          placeholder={"오늘 있었던 일을 3줄 이상 적어주세요.\n친구가 천천히 성장해요."}
          className="min-h-40 resize-none rounded-[18px] border border-[#FFD6A5] bg-[#FFF8F0] px-4 py-3 text-base leading-7 text-[#3A2E2E] outline-none focus:border-[#FF9FB2] focus:ring-4 focus:ring-[#FF9FB2]/20"
        />
        <Button type="button" onClick={onClose}>
          일기 저장하기
        </Button>
      </form>
    </Modal>
  );
}
