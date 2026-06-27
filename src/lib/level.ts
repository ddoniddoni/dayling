export type ExpState = {
  level: number;
  exp: number;
};

export type ExpResult = ExpState & {
  levelUps: number;
};

export function getRequiredExp(level: number) {
  if (!Number.isInteger(level) || level < 1) {
    throw new Error("Level must be a positive integer.");
  }

  return level * 100;
}

export function applyExp(character: ExpState, gainedExp: number): ExpResult {
  if (!Number.isInteger(character.level) || character.level < 1) {
    throw new Error("Character level must be a positive integer.");
  }

  if (!Number.isInteger(character.exp) || character.exp < 0) {
    throw new Error("Character exp must be a non-negative integer.");
  }

  if (!Number.isInteger(gainedExp) || gainedExp < 0) {
    throw new Error("Gained exp must be a non-negative integer.");
  }

  let level = character.level;
  let exp = character.exp + gainedExp;
  let levelUps = 0;

  while (exp >= getRequiredExp(level)) {
    exp -= getRequiredExp(level);
    level += 1;
    levelUps += 1;
  }

  return { level, exp, levelUps };
}
