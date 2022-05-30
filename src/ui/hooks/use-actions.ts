import { useCallback, useMemo, useRef } from "react";
import type { State } from "../adaptor/state";
import { Tracking } from "../../services/tracking";
import type { Character } from "../../domain/entities/character";
import { quotesRepo } from "../../infra/repos/get-quotes";
import { config } from "../../config";
import type { Bus } from "../../infra/types";

export const useActions = (emit: Bus["emit"], _state: State) => {
  const { current: tracking } = useRef<Tracking>(new Tracking({ magic: "🪄" }));

  const onStartGameClick = useCallback(async () => {
    const crop = config.get("questions");
    const quotes = await quotesRepo.get(crop);

    tracking.track("start_game_click");
    emit("@APP/NEW_QUOTES_LOADED", { root: { quotes } });
  }, []);

  return useMemo(
    () => ({
      onCharacterClick: (character: Character) => {
        emit("@UI/CHARACTER_CLICK", { character });
      },
      onReady: () => {
        emit("@UI/PAGE_READY");
      },
      onStartGameClick,
      onTimeout: () => {
        emit("@UI/TIMEOUT");
      },
    }),
    []
  );
};
