import type { Bus } from "./types";
import { play } from "../utils/play";
import { pick } from "../utils/pick";

export const setupMortalCombatAudio = ({ on }: Bus) => {
  on("@APP/GAME_FINISHED", ({ root }) => {
    setTimeout(() => {
      const allCorrect = root.correctCount === root.quotes.length;
      if (allCorrect) play("/audio/flawless-victory.mp3");
    }, 2000);
  });

  on("@APP/ANSWER_VALIDATED", ({ root: { prevQuote } }) => {
    if (!prevQuote) return;

    switch (true) {
      case prevQuote.isCombo:
        play(pick(["/audio/superb.mp3", "/audio/brutal.mp3"]));
        break;

      case prevQuote.isAntiCombo:
        play("/audio/baby.mp3");
        break;

      case prevQuote.isCorrect:
        play("/audio/well-done.mp3");
        break;

      case Boolean(prevQuote?.answer):
        play(
          pick([
            "/audio/laughing-5.mp3",
            "/audio/laugh.mp3",
            "/audio/ha-ha-ha.mp3",
          ])
        );
        break;

      default: //time out
        play(pick(["/audio/waiting.mp3"]));
        break;
    }
  });
};
