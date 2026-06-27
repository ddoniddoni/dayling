"use client";

import type { ReactNode } from "react";

import { Button } from "./button";

type ModalProps = {
  title: string;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

export function Modal({ title, open, onClose, children }: ModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#3A2E2E]/35 p-4">
      <div className="w-full max-w-md rounded-t-[28px] bg-white p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] shadow-[0_-18px_40px_rgba(58,46,46,0.18)]">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-lg font-black text-[#3A2E2E]">{title}</h2>
          <Button variant="ghost" onClick={onClose} className="px-3">
            닫기
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
}
