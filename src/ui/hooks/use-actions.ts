import { useMemo } from "react";
import type { State } from "../adaptor/state";
import type { Character } from "../../domain/entities/character";
import type { Bus } from "../../infra/types";

export const useActions = (emit: Bus["emit"], _state: State) => {
  return useMemo(
    () => ({
      onCharacterClick: (character: Character) => {
        emit("@UI/CHARACTER_CLICK", { character });
      },
      onReady: () => {
        emit("@UI/PAGE_READY");
      },
      onStartGameClick: () => {
        emit("@UI/START_GAME_CLICK");
      },
      onTimeout: () => {
        emit("@UI/TIMEOUT");
      },
    }),
    []
  );
};
