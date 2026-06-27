export const DIARY_REQUIRED_LINE_COUNT = 3;
export const DIARY_EXP = 30;
export const FIRST_DIARY_BONUS_EXP = 20;

export function countNonEmptyDiaryLines(content: string) {
  return content.split(/\r?\n/).filter((line) => line.trim().length > 0).length;
}

export function isValidDiaryContent(content: string) {
  return countNonEmptyDiaryLines(content) >= DIARY_REQUIRED_LINE_COUNT;
}

export function getDiaryGrantedExp({
  isFirstDiary,
  canGrantDailyExp,
}: {
  isFirstDiary: boolean;
  canGrantDailyExp: boolean;
}) {
  if (!canGrantDailyExp) {
    return 0;
  }

  return DIARY_EXP + (isFirstDiary ? FIRST_DIARY_BONUS_EXP : 0);
}

export function getLocalDayRange(date = new Date()) {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(end.getDate() + 1);

  return { start, end };
}
