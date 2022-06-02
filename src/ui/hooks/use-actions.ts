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

/**
// Move to /infra/setup-audio.ts
// and setup the events
const playVoice = () => {
  if (!logs.length) return;

  const comboSample = logs.slice(-3);
  const canCombo = comboSample.length >= 3;
  const combo = canCombo ? comboSample.every((l) => l.isCorrect) : false;
  const unlucky = canCombo ? comboSample.every((l) => !l.isCorrect) : false;
  const value = valueRef.current;

  switch (true) {
    case combo:
      play(
        pick(
          isMKEnabled
            ? ["/audio/superb.mp3", "/audio/brutal.mp3"]
            : ["/audio/a-geek.mp3"]
        )
      );
      break;

    case unlucky:
      play(
        isMKEnabled
          ? "/audio/baby.mp3"
          : "/audio/you-are-totally-making-this-up.mp3"
      );
      break;

    case logs[logs.length - 1].isCorrect:
      if (isMKEnabled) {
        play("/audio/well-done.mp3");
      } else {
        playCharacterYes(characters, value);
      }
      break;

    case Boolean(value):
      if (isMKEnabled) {
        play(
          pick([
            "/audio/laughing-5.mp3",
            "/audio/laugh.mp3",
            "/audio/ha-ha-ha.mp3",
          ])
        );
      } else {
        playCharacterNo(characters, value);
      }
      break;

    default: //time out
      if (isMKEnabled) {
        play(pick(["/audio/waiting.mp3"]));
      } else {
        const random = pick(characters);
        play(pick(random.lexical.hello));
      }
      break;
  }
};
 */
