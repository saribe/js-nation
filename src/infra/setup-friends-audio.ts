import type { Bus } from "./types";
import { play, playCharacterNo, playCharacterYes } from "../utils/play";
import { pick } from "../utils/pick";

export const setupFriendsAudio = ({ on }: Bus) => {
  on("@APP/ANSWER_VALIDATED", ({ root: { prevQuote, characters } }) => {
    if (!prevQuote) return;

    switch (true) {
      case prevQuote.isCombo:
        play("/audio/a-geek.mp3");
        break;

      case prevQuote.isAntiCombo:
        play("/audio/you-are-totally-making-this-up.mp3");
        break;

      case prevQuote.isCorrect:
        playCharacterYes(characters, prevQuote.answer);
        break;

      case Boolean(prevQuote?.answer):
        playCharacterNo(characters, prevQuote.answer);
        break;

      default: //time out
        const random = pick(characters);
        play(pick(random.lexical.hello));
        break;
    }
  });
};
