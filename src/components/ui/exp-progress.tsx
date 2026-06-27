type ExpProgressProps = {
  current: number;
  required: number;
};

export function ExpProgress({ current, required }: ExpProgressProps) {
  const percentage = Math.min(100, Math.max(0, Math.round((current / required) * 100)));

  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between text-sm font-black text-[#3A2E2E]">
        <span>EXP</span>
        <span>
          {current} / {required}
        </span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-[#FFE1E8]">
        <div
          className="h-full rounded-full bg-[#FF9FB2] transition-[width]"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
