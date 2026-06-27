type EggCardProps = {
  label: string;
  selected: boolean;
  tone: "pink" | "blue" | "green";
  onSelect: () => void;
};

const toneClass: Record<EggCardProps["tone"], string> = {
  pink: "from-[#FFD9E1] to-[#FF9FB2]",
  blue: "from-[#EAF7FF] to-[#BDE0FE]",
  green: "from-[#F3FFE9] to-[#CAFFBF]",
};

export function EggCard({ label, selected, tone, onSelect }: EggCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`relative grid min-h-44 place-items-center rounded-[24px] border bg-white/90 p-4 text-center shadow-[0_12px_30px_rgba(255,159,178,0.18)] transition active:scale-[0.98] ${
        selected
          ? "border-[#FF9FB2] ring-4 ring-[#FF9FB2]/25"
          : "border-white/80"
      }`}
    >
      <div className="relative h-28 w-24">
        <div
          className={`absolute inset-x-2 bottom-0 h-28 rounded-[50%_50%_44%_44%] bg-gradient-to-b ${toneClass[tone]} shadow-inner`}
        />
        <div className="absolute left-7 top-7 h-5 w-5 rounded-full bg-white/55" />
        <div className="absolute right-6 top-14 h-3 w-3 rounded-full bg-white/45" />
      </div>
      <span className="mt-3 text-base font-black text-[#3A2E2E]">{label}</span>
      {selected ? (
        <span className="absolute right-3 top-3 rounded-full bg-[#FF9FB2] px-3 py-1 text-xs font-black text-white">
          선택됨
        </span>
      ) : null}
    </button>
  );
}
