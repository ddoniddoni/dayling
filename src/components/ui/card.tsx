import type { HTMLAttributes } from "react";

export function Card({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-[24px] border border-white/80 bg-white/90 shadow-[0_12px_30px_rgba(255,159,178,0.18)] ${className}`}
      {...props}
    />
  );
}
