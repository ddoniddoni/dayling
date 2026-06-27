export type ExpState = {
  level: number;
  exp: number;
};

export function getRequiredExp(level: number) {
  return level * 100;
}

export function applyExp(character: ExpState, gainedExp: number): ExpState {
  let level = character.level;
  let exp = character.exp + gainedExp;

  while (exp >= getRequiredExp(level)) {
    exp -= getRequiredExp(level);
    level += 1;
  }

  return { level, exp };
}

