import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export function Button({
  className = "",
  variant = "primary",
  ...props
}: ButtonProps) {
  const variantClass =
    variant === "primary"
      ? "bg-pink-500 text-white shadow-pink-200"
      : "bg-white text-zinc-800 shadow-pink-100";

  return (
    <button
      className={`min-h-12 rounded-2xl px-5 py-3 text-base font-bold shadow-lg transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 ${variantClass} ${className}`}
      {...props}
    />
  );
}

