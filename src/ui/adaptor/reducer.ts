import { createLogger } from "../../services/logger";
import type { State } from "./state";
import { shuffle } from "../../utils/shuffle";
import { config } from "../../config";
import { isFeatEnabled } from "../../services/feat-panel";
import { getRouteTime } from "../../utils/getRoundTime";
import { calculatePoints } from "./calculate-points";
import { Events, EventKey, EventValues } from "../../infra/types";

type Action = EventValues & { type: EventKey };

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
  const { type, root = {} } = action;

  logger.log("👋 Hello! I'm the reducer.", action);

  switch (type) {
    case "@APP/GAME_DATA_LOADED":
      return {
        ...prevState,
        characters: root.characters,
        ...reduceNewGame(root),
      };

    case "@APP/NEW_QUOTES_LOADED": {
      return {
        ...prevState,
        ...reduceNewGame(root),
      };
    }

    case "@APP/ANSWER_VALIDATED":
      const { isCorrect } = action as Events["@APP/ANSWER_VALIDATED"];
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
