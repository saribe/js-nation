import { createLogger } from "../../services/logger";
import type { RootAggregator } from "../../domain/value-objects/root-aggregator";
import type { State } from "./state";
import { shuffle } from "../../utils/shuffle";
import { config } from "../../config";
import { isFeatEnabled } from "../../services/feat-panel";
import { getRouteTime } from "../../utils/getRoundTime";
import { calculatePoints } from "./calculate-points";

type EventType = `@UI/${string}` | `@APP/${string}`;
export type Action = {
  error?: string;
  isCorrect?: boolean;
  root?: Partial<RootAggregator>;
  type: EventType;
};

const logger = createLogger({ page_name: "HOME" });
const isVIPUser = isFeatEnabled("vip");
const minPoints = config.get("minPoints");
const MIN_POINTS = isVIPUser ? minPoints * 1.25 : minPoints;
const ROUND_TIME = getRouteTime();

const reduceNewGame = (root: Action["root"]): Partial<State> => {
  const shuffled = shuffle(root.quotes);
  const timeStamp = Date.now();

  shuffled[0].isActive = true;

  return {
    logs: [],
    quote: shuffled[0],
    quotes: shuffled,
    isGameOver: false,
    timeStamp,
  };
};

export const reducer = (prevState: State, action: Action): State => {
  const { type, root = {}, isCorrect } = action;

  logger.log("👋 Hello! I'm the reducer.", action);

  switch (type) {
    case "@UI/GAME_DATA_LOADED":
      return {
        ...prevState,
        characters: root.characters,
        ...reduceNewGame(root),
      };

    case "@UI/NEW_QUOTES_LOADED": {
      return {
        ...prevState,
        ...reduceNewGame(root),
      };
    }

    case "@UI/ANSWER_VALIDATED":
      const timeStamp = Date.now();
      const logs = [
        ...prevState.logs,
        { isCorrect, time: timeStamp - prevState.timeStamp },
      ];

      return {
        ...prevState,
        correctCount: logs.filter((l) => l.isCorrect).length,
        quotes: root.quotes,
        isGameOver: !root.quote,
        logs,
        points: calculatePoints(logs, ROUND_TIME, MIN_POINTS),
        quote: root.quote,
        timeStamp,
      };

    default:
      return prevState;
  }
};
