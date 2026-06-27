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
      className={`grid min-h-16 place-items-center gap-1 rounded-[20px] px-2 py-2 text-xs font-black shadow-[0_10px_22px_rgba(58,46,46,0.08)] transition active:scale-[0.97] disabled:opacity-50 ${toneClass[tone]} ${className}`}
      {...props}
    >
      <span className="text-xl leading-none">{icon}</span>
      <span>{label}</span>
    </button>
  );
}
