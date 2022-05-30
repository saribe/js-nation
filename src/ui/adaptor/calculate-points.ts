import type { State } from "./state";

export const calculatePoints = (
  logs: State["logs"],
  maxTime: number,
  minPoints: number
) => {
  let combo = 0;
  return logs.reduce((acc, log) => {
    if (!log.isCorrect) {
      combo = 0;
      return acc;
    }

    const multiplier = ++combo === 3 ? 1.5 : 1;
    const points = (maxTime - Math.min(maxTime - minPoints, log.time)) / 4;
    return acc + Math.floor(points * multiplier);
  }, 0);
};
