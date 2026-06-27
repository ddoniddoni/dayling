import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({
  className = "",
  variant = "primary",
  ...props
}: ButtonProps) {
  const variantClass =
    variant === "primary"
      ? "bg-[#FF9FB2] text-white shadow-[0_10px_22px_rgba(255,159,178,0.28)]"
      : variant === "secondary"
        ? "border border-[#FFD6A5] bg-white text-[#3A2E2E] shadow-[0_10px_22px_rgba(255,214,165,0.22)]"
        : "bg-transparent text-[#8F7D7D] shadow-none";

  return (
    <button
      className={`min-h-12 rounded-[18px] px-5 py-3 text-base font-black transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 ${variantClass} ${className}`}
      {...props}
    />
  );
}
