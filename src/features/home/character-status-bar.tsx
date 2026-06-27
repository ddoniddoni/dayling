import { Card } from "@/components/ui/card";
import { ExpProgress } from "@/components/ui/exp-progress";
import { RarityBadge } from "@/components/ui/rarity-badge";
import { StatusChip } from "@/components/ui/status-chip";
import { logoutAction } from "@/features/auth/actions";
import type { MainCharacter } from "@/features/character/character.types";

type CharacterStatusBarProps = {
  character: MainCharacter;
};

export function CharacterStatusBar({ character }: CharacterStatusBarProps) {
  return (
    <Card className="p-3">
      <div className="mb-2 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className="truncate text-xl font-black leading-tight text-[#3A2E2E]">
            {character.catalog.name} Lv. {character.level}
          </h1>
          <p className="text-sm font-bold text-[#8F7D7D]">
            EXP {character.exp} / {character.requiredExp}
          </p>
        </div>
        <div className="grid justify-items-end gap-1.5">
          <RarityBadge rarity={character.catalog.rarity} />
          <form action={logoutAction}>
            <button
              type="submit"
              className="min-h-8 rounded-full px-3 text-xs font-black text-[#8F7D7D] transition active:scale-[0.98]"
            >
              로그아웃
            </button>
          </form>
        </div>
      </div>

      <ExpProgress current={character.exp} required={character.requiredExp} />

      <div className="mt-3 grid grid-cols-4 gap-1.5">
        <StatusChip label="포만감" value={character.status.hunger} tone="peach" />
        <StatusChip label="수분" value={character.status.hydration} tone="blue" />
        <StatusChip label="친밀도" value={character.status.affection} tone="pink" />
        <StatusChip label="에너지" value={character.status.energy} tone="green" />
      </div>
    </Card>
  );
}
