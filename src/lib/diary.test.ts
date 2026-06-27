import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  countNonEmptyDiaryLines,
  getDiaryGrantedExp,
  isValidDiaryContent,
} from "@/lib/diary";

describe("diary utilities", () => {
  it("counts non-empty lines only", () => {
    assert.equal(countNonEmptyDiaryLines("첫 줄\n\n  \n둘째 줄\r\n셋째 줄"), 3);
  });

  it("validates at least three non-empty lines", () => {
    assert.equal(isValidDiaryContent("하나\n둘\n셋"), true);
    assert.equal(isValidDiaryContent("하나\n\n둘"), false);
  });

  it("grants first diary bonus only when daily exp is available", () => {
    assert.equal(getDiaryGrantedExp({ isFirstDiary: true, canGrantDailyExp: true }), 50);
    assert.equal(getDiaryGrantedExp({ isFirstDiary: false, canGrantDailyExp: true }), 30);
    assert.equal(getDiaryGrantedExp({ isFirstDiary: true, canGrantDailyExp: false }), 0);
  });
});
