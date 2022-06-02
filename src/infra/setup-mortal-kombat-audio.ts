import type { Handler } from "../services/event-bus";
import type { Bus, EventValues } from "./types";
import { play } from "../utils/play";
import { pick } from "../utils/pick";

type Announcement = Handler<EventValues>;

const actionAnnouncement: Announcement = ({ root: { prevQuote } }) => {
  if (!prevQuote) return;

  switch (true) {
    // https://youtu.be/-OVcnN_wpwk?t=30
    case prevQuote.isCombo:
      play(
        pick([
          "/audio/crispy.mp3",
          "/audio/frosty.mp3",
          "/audio/oh-wow.mp3",
          "/audio/toasty.mp3",
        ])
      );
      break;

    case prevQuote.isAntiCombo:
      play(
        pick([
          "/audio/fatality.mp3",
          "/audio/suck.mp3",
          "/audio/you-will-die-mortal.mp3",
        ])
      );
      break;

    case prevQuote.isCorrect:
      play(
        pick([
          "/audio/well-done.mp3",
          "/audio/superb.mp3",
          "/audio/brutal.mp3",
          "/audio/outstanding.mp3",
        ])
      );
      break;

    case Boolean(prevQuote?.answer):
      play(
        pick([
          "/audio/ha-ha-ha.mp3",
          "/audio/laugh.mp3",
          "/audio/laughing-5.mp3",
        ])
      );
      break;

    default: //time out
      play(pick(["/audio/waiting.mp3"]));
      break;
  }
};

const gameOverAnnouncement: Announcement = ({ root }) => {
  setTimeout(() => {
    const allCorrect = root.correctCount === root.quotes.length;
    if (allCorrect) play("/audio/flawless-victory.mp3");
  }, 2000);
};

export const setupMortalKombatAudio = ({ on }: Bus) => {
  on("@APP/ANSWER_VALIDATED", actionAnnouncement);
  on("@APP/GAME_FINISHED", gameOverAnnouncement);
};
