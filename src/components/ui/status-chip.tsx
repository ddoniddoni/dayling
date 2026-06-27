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
      className={`flex min-h-10 items-center justify-between gap-2 rounded-full px-3 text-xs font-black ${toneClass[tone]}`}
    >
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
