"use client";

import { DiaryForm } from "@/components/dayling/diary-form";
import { Modal } from "@/components/ui/modal";
import type { DiaryApiResponse } from "@/features/character/character.types";

type DiaryModalProps = {
  open: boolean;
  onClose: () => void;
  onSaved: (response: Extract<DiaryApiResponse, { ok: true }>) => void;
};

export function DiaryModal({ open, onClose, onSaved }: DiaryModalProps) {
  return (
    <Modal title="오늘의 일기" open={open} onClose={onClose}>
      <DiaryForm
        onSaved={(response) => {
          onSaved(response);
          onClose();
        }}
      />
    </Modal>
  );
}
