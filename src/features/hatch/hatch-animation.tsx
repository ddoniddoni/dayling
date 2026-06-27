type HatchAnimationProps = {
  eggLabel: string;
};

export function HatchAnimation({ eggLabel }: HatchAnimationProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-40 grid place-items-center bg-[#FFF8F0]/95 px-6"
    >
      <div className="grid w-full max-w-sm justify-items-center gap-5 text-center">
        <div className="relative grid h-52 w-52 place-items-center">
          <div className="absolute inset-0 rounded-full bg-[#FFD6A5]/35 blur-2xl" />
          <div className="dayling-hatch-egg relative h-40 w-32 rounded-[50%_50%_44%_44%] bg-gradient-to-b from-[#FFE7EE] via-[#FFD6A5] to-[#FF9FB2] shadow-[inset_-14px_-18px_24px_rgba(154,83,97,0.16),0_22px_42px_rgba(255,159,178,0.28)]">
            <div className="absolute left-8 top-9 h-5 w-5 rounded-full bg-white/60" />
            <div className="absolute right-7 top-16 h-3 w-3 rounded-full bg-white/45" />
            <div className="dayling-hatch-crack absolute left-1/2 top-14 h-16 w-12 -translate-x-1/2" />
          </div>
        </div>

        <div className="grid gap-2">
          <p className="text-sm font-black text-[#9A5361]">{eggLabel}</p>
          <h2 className="text-2xl font-black text-[#3A2E2E]">
            알이 흔들리고 있어요
          </h2>
          <p className="text-sm font-bold leading-6 text-[#8F7D7D]">
            서버에서 친구를 고르는 중이에요. 잠시만 기다려주세요.
          </p>
        </div>

        <div className="flex gap-2" aria-hidden="true">
          <span className="dayling-hatch-dot h-2.5 w-2.5 rounded-full bg-[#FF9FB2]" />
          <span className="dayling-hatch-dot h-2.5 w-2.5 rounded-full bg-[#FFD6A5] [animation-delay:120ms]" />
          <span className="dayling-hatch-dot h-2.5 w-2.5 rounded-full bg-[#BDE0FE] [animation-delay:240ms]" />
        </div>
      </div>
    </div>
  );
}
