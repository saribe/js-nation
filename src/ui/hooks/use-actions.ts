import type { Dispatch } from "react";
import type { Action } from "../adaptor/reducer";
import type { State } from "../adaptor/state";

export const useActions = (dispatch: Dispatch<Action>, state: State) => {
  return {
    onCharacterClick,
    onGameOver,
    onReady,
    onStartGameClick,
    onTimeout, // Trigger the nextQuestion without CharacterId
    onLogsChange: playVoice,
  };
};
