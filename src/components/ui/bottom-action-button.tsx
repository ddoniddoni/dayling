import type { ButtonHTMLAttributes, ReactNode } from "react";

type BottomActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: ReactNode;
  label: string;
  tone?: "pink" | "peach" | "blue" | "green";
};

const toneClass: Record<NonNullable<BottomActionButtonProps["tone"]>, string> = {
  pink: "bg-[#FFF0F3] text-[#9A5361]",
  peach: "bg-[#FFF2DE] text-[#8A6544]",
  blue: "bg-[#F1F8FF] text-[#3F6F91]",
  green: "bg-[#F1FFE9] text-[#4E7A40]",
};

export function BottomActionButton({
  icon,
  label,
  tone = "pink",
  className = "",
  ...props
}: BottomActionButtonProps) {
  return (
    <button
      type="button"
      className={`grid min-h-[58px] place-items-center gap-0.5 rounded-[18px] px-1.5 py-2 text-[11px] font-black leading-tight shadow-[0_10px_22px_rgba(58,46,46,0.08)] transition active:scale-[0.97] disabled:opacity-50 ${toneClass[tone]} ${className}`}
      {...props}
    >
      <span className="text-lg leading-none">{icon}</span>
      <span className="whitespace-nowrap">{label}</span>
    </button>
  );
}
