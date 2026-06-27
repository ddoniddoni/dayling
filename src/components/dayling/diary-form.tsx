"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import type { DiaryApiResponse } from "@/features/character/character.types";
import { DIARY_REQUIRED_LINE_COUNT, countNonEmptyDiaryLines } from "@/lib/diary";

type DiaryFormProps = {
  onSaved: (response: Extract<DiaryApiResponse, { ok: true }>) => void;
};

export function DiaryForm({ onSaved }: DiaryFormProps) {
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lineCount = useMemo(() => countNonEmptyDiaryLines(content), [content]);
  const canSubmit = lineCount >= DIARY_REQUIRED_LINE_COUNT && !isSaving;

  async function submitDiary() {
    if (!canSubmit) {
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      const response = await fetch("/api/diary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });
      const data = (await response.json()) as DiaryApiResponse;

      if (!data.ok) {
        setError(data.message);
        return;
      }

      setContent("");
      onSaved(data);
    } catch {
      setError("일기를 저장하지 못했어요. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form
      className="grid gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        void submitDiary();
      }}
    >
      <label className="grid gap-2 text-sm font-black text-[#3A2E2E]">
        일기
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          rows={7}
          placeholder={"오늘 있었던 일을 3줄 이상 적어주세요.\n빈 줄은 줄 수에 포함되지 않아요.\n친구가 천천히 성장해요."}
          className="min-h-44 resize-none rounded-[18px] border border-[#FFD6A5] bg-[#FFF8F0] px-4 py-3 text-base leading-7 text-[#3A2E2E] outline-none focus:border-[#FF9FB2] focus:ring-4 focus:ring-[#FF9FB2]/20"
        />
      </label>

      <div className="flex items-center justify-between gap-3 rounded-[18px] bg-[#FFF8F0] px-4 py-3 text-sm font-black">
        <span className={lineCount >= DIARY_REQUIRED_LINE_COUNT ? "text-[#4E7A40]" : "text-[#9A5361]"}>
          {lineCount} / {DIARY_REQUIRED_LINE_COUNT}줄
        </span>
        <span className="text-right text-[#8F7D7D]">빈 줄은 제외돼요</span>
      </div>

      {error ? (
        <p role="alert" className="rounded-[18px] bg-[#FFF0F3] px-4 py-3 text-sm font-black text-[#9A5361]">
          {error}
        </p>
      ) : null}

      <Button type="submit" disabled={!canSubmit}>
        {isSaving ? "저장 중..." : "일기 저장하기"}
      </Button>
    </form>
  );
}
