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

// const playVoice = () => {
//   if (!logs.length) return;

//   const comboSample = logs.slice(-3);
//   const canCombo = comboSample.length >= 3;
//   const combo = canCombo ? comboSample.every((l) => l.isCorrect) : false;
//   const unlucky = canCombo ? comboSample.every((l) => !l.isCorrect) : false;
//   const value = valueRef.current;

//   switch (true) {
//     case combo:
//       play(
//         pick(
//           isMKEnabled
//             ? ["/audio/superb.mp3", "/audio/brutal.mp3"]
//             : ["/audio/a-geek.mp3"]
//         )
//       );
//       tracking.track("media_play", { type: "audio", lexeme: "combo" });
//       break;

//     case unlucky:
//       play(
//         isMKEnabled
//           ? "/audio/baby.mp3"
//           : "/audio/you-are-totally-making-this-up.mp3"
//       );
//       tracking.track("media_play", { type: "audio", lexeme: "fatality" });
//       break;

//     case logs[logs.length - 1].isCorrect:
//       if (isMKEnabled) {
//         play("/audio/well-done.mp3");
//       } else {
//         playCharacterYes(characters, value);
//       }
//       tracking.track("media_play", { type: "audio", lexeme: "yes" });
//       break;

//     case Boolean(value):
//       if (isMKEnabled) {
//         play(
//           pick([
//             "/audio/laughing-5.mp3",
//             "/audio/laugh.mp3",
//             "/audio/ha-ha-ha.mp3",
//           ])
//         );
//       } else {
//         playCharacterNo(characters, value);
//       }
//       tracking.track("media_play", { type: "audio", lexeme: "no" });
//       break;

//     default: //time out
//       if (isMKEnabled) {
//         play(pick(["/audio/waiting.mp3"]));
//       } else {
//         const random = pick(characters);
//         play(pick(random.lexical.hello));
//       }
//       tracking.track("media_play", { type: "audio", lexeme: "hello" });
//       break;
//   }
// };
