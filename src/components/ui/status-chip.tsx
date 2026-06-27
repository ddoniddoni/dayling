type StatusChipProps = {
  label: string;
  value: number;
  tone?: "peach" | "blue" | "green" | "pink";
};

const toneClass: Record<NonNullable<StatusChipProps["tone"]>, string> = {
  peach: "bg-[#FFF2DE] text-[#8A6544]",
  blue: "bg-[#F1F8FF] text-[#3F6F91]",
  green: "bg-[#F1FFE9] text-[#4E7A40]",
  pink: "bg-[#FFF0F3] text-[#9A5361]",
};

export function StatusChip({ label, value, tone = "pink" }: StatusChipProps) {
  return (
    <div
      className={`grid min-h-9 min-w-0 place-items-center rounded-full px-2 text-[11px] font-black leading-tight ${toneClass[tone]}`}
    >
      <span className="truncate">{label}</span>
      <span>{value}</span>
    </div>
  );
}
