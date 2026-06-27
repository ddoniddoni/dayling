import type { HTMLAttributes, ReactNode } from "react";

type ToastTone = "success" | "error" | "info";

type ToastProps = HTMLAttributes<HTMLDivElement> & {
  title: string;
  description?: ReactNode;
  tone?: ToastTone;
};

const toneClasses: Record<ToastTone, string> = {
  success: "border-[#CAFFBF] bg-[#F1FFE9] text-[#3A2E2E]",
  error: "border-[#FF9FB2] bg-[#FFF0F3] text-[#3A2E2E]",
  info: "border-[#BDE0FE] bg-[#F1F8FF] text-[#3A2E2E]",
};

export function Toast({
  title,
  description,
  tone = "info",
  className = "",
  ...props
}: ToastProps) {
  return (
    <div
      role="status"
      className={`rounded-[20px] border px-4 py-3 shadow-[0_12px_28px_rgba(58,46,46,0.12)] ${toneClasses[tone]} ${className}`}
      {...props}
    >
      <p className="text-sm font-black">{title}</p>
      {description ? (
        <div className="mt-1 text-sm leading-6 opacity-80">{description}</div>
      ) : null}
    </div>
  );
}
