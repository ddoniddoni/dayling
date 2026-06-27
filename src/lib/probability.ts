export type WeightedCharacter = {
  id: string;
  probability: number;
};

export function getProbabilityTotal(characters: WeightedCharacter[]) {
  return characters.reduce((sum, character) => sum + character.probability, 0);
}

export function assertProbabilityTotal(characters: WeightedCharacter[]) {
  const total = getProbabilityTotal(characters);

  if (total !== 100) {
    throw new Error(`Character probability total must be 100, received ${total}.`);
  }
}

export function pickWeightedCharacter<T extends WeightedCharacter>(
  characters: T[],
  randomValue = Math.random() * 100,
) {
  assertProbabilityTotal(characters);

  let cursor = 0;

  for (const character of characters) {
    cursor += character.probability;

    if (randomValue < cursor) {
      return character;
    }
  }

  return characters.at(-1);
}

