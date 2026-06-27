import type { HTMLAttributes } from "react";

export function Card({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-[8px] border border-pink-100 bg-white/85 shadow-sm ${className}`}
      {...props}
    />
  );
}

