import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  assertProbabilityTotal,
  getProbabilityTotal,
  pickWeightedCharacter,
} from "@/lib/probability";

const table = [
  { id: "common_01", probability: 80 },
  { id: "rare_01", probability: 15 },
  { id: "unique_01", probability: 4 },
  { id: "legendary_01", probability: 1 },
];

describe("probability utilities", () => {
  it("calculates total probability", () => {
    assert.equal(getProbabilityTotal(table), 100);
  });

  it("accepts exactly 100 total probability", () => {
    assert.doesNotThrow(() => assertProbabilityTotal(table));
  });

  it("rejects invalid probability tables", () => {
    assert.throws(() => assertProbabilityTotal([]));
    assert.throws(() => assertProbabilityTotal([{ id: "broken", probability: 99 }]));
    assert.throws(() => assertProbabilityTotal([{ id: "broken", probability: -1 }]));
  });

  it("picks a character by cumulative probability", () => {
    assert.equal(pickWeightedCharacter(table, 0).id, "common_01");
    assert.equal(pickWeightedCharacter(table, 79.999).id, "common_01");
    assert.equal(pickWeightedCharacter(table, 80).id, "rare_01");
    assert.equal(pickWeightedCharacter(table, 95).id, "unique_01");
    assert.equal(pickWeightedCharacter(table, 99).id, "legendary_01");
  });

  it("rejects random values outside the draw range", () => {
    assert.throws(() => pickWeightedCharacter(table, -1));
    assert.throws(() => pickWeightedCharacter(table, 100));
  });
});
