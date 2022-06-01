import { createLogger } from "../../services/logger";
import type { State } from "./state";
import type { EventKey, EventValues } from "../../infra/types";

type Action = EventValues & { type: EventKey };

const logger = createLogger({ page_name: "HOME" });

export const reducer = (prevState: State, action: Action): State => {
  const { type, root = {} } = action;

  logger.log("👋 Hello! I'm the reducer.", action);

  switch (type) {
    case "@APP/GAME_DATA_LOADED":
      return {
        ...prevState,
        characters: root.characters,
        isGameOver: false,
        quote: root.quote,
        quotes: root.quotes,
      };

    case "@APP/NEW_QUOTES_LOADED": {
      return {
        ...prevState,
        isGameOver: false,
        quote: root.quote,
        quotes: root.quotes,
      };
    }

    case "@APP/GAME_FINISHED":
      return {
        ...prevState,
        isGameOver: true,
      };

    case "@APP/ANSWER_VALIDATED":
      return {
        ...prevState,
        correctCount: root.correctCount,
        points: root.points,
        prevQuote: root.prevQuote,
        quote: root.quote,
        quotes: root.quotes,
      };

    case "@APP/LOBBY_AUDIO_UPDATED":
      return {
        ...prevState,
        muted: !root.allowLobbyAudio,
      };

    default:
      return prevState;
  }
};
