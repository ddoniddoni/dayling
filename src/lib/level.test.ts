import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { applyExp, getRequiredExp } from "@/lib/level";

describe("level utilities", () => {
  it("calculates required exp from level", () => {
    assert.equal(getRequiredExp(1), 100);
    assert.equal(getRequiredExp(3), 300);
  });

  it("applies exp without leveling up", () => {
    assert.deepEqual(applyExp({ level: 2, exp: 40 }, 50), {
      level: 2,
      exp: 90,
      levelUps: 0,
    });
  });

  it("handles multiple level ups", () => {
    assert.deepEqual(applyExp({ level: 1, exp: 90 }, 350), {
      level: 3,
      exp: 140,
      levelUps: 2,
    });
  });

  it("rejects invalid exp input", () => {
    assert.throws(() => applyExp({ level: 1, exp: 0 }, -1));
    assert.throws(() => getRequiredExp(0));
  });
});
