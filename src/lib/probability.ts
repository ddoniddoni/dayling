export type WeightedCharacter = {
  id: string;
  probability: number;
};

export const REQUIRED_PROBABILITY_TOTAL = 100;

export function getProbabilityTotal(characters: WeightedCharacter[]) {
  return characters.reduce((sum, character) => sum + character.probability, 0);
}

export function assertProbabilityTotal(characters: WeightedCharacter[]) {
  if (characters.length === 0) {
    throw new Error("Character probability table is empty.");
  }

  for (const character of characters) {
    if (!Number.isFinite(character.probability) || character.probability < 0) {
      throw new Error(`Invalid probability for character ${character.id}.`);
    }
  }

  const total = getProbabilityTotal(characters);

  if (total !== REQUIRED_PROBABILITY_TOTAL) {
    throw new Error(`Character probability total must be 100, received ${total}.`);
  }
}

export function pickWeightedCharacter<T extends WeightedCharacter>(
  characters: T[],
  randomValue = Math.random() * 100,
) {
  assertProbabilityTotal(characters);

  if (!Number.isFinite(randomValue) || randomValue < 0 || randomValue >= 100) {
    throw new Error("Random value must be greater than or equal to 0 and less than 100.");
  }

  let cursor = 0;

  for (const character of characters) {
    cursor += character.probability;

    if (randomValue < cursor) {
      return character;
    }
  }

  return characters[characters.length - 1];
}
