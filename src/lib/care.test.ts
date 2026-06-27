import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  CARE_ANIMATION,
  CARE_COOLDOWN_MS,
  applyCareStatus,
  clampStatus,
  getCareActionDefinition,
} from "@/lib/care";

const baseStatus = {
  hunger: 50,
  hydration: 50,
  affection: 50,
  energy: 50,
};

describe("care utilities", () => {
  it("clamps status between 0 and 100", () => {
    assert.equal(clampStatus(-5), 0);
    assert.equal(clampStatus(40), 40);
    assert.equal(clampStatus(140), 100);
  });

  it("applies feed status changes", () => {
    assert.deepEqual(applyCareStatus(baseStatus, "FEED"), {
      hunger: 68,
      hydration: 50,
      affection: 50,
      energy: 54,
    });
  });

  it("does not allow status values above 100", () => {
    assert.deepEqual(applyCareStatus({ ...baseStatus, hunger: 95, energy: 99 }, "FEED"), {
      hunger: 100,
      hydration: 50,
      affection: 50,
      energy: 100,
    });
  });

  it("defines cooldowns and animations for all supported actions", () => {
    assert.equal(CARE_COOLDOWN_MS.FEED, 30 * 60 * 1000);
    assert.equal(CARE_COOLDOWN_MS.WATER, 30 * 60 * 1000);
    assert.equal(CARE_COOLDOWN_MS.PET, 10 * 60 * 1000);
    assert.equal(CARE_COOLDOWN_MS.TOUCH, 10 * 1000);

    assert.equal(CARE_ANIMATION.FEED, "eat");
    assert.equal(CARE_ANIMATION.WATER, "drink");
    assert.equal(CARE_ANIMATION.PET, "happy");
    assert.equal(CARE_ANIMATION.TOUCH, "happy");
  });

  it("returns a full care action definition", () => {
    assert.deepEqual(getCareActionDefinition("WATER"), {
      actionType: "WATER",
      cooldownMs: 30 * 60 * 1000,
      animation: "drink",
      statusDelta: { hydration: 18 },
    });
  });
});
