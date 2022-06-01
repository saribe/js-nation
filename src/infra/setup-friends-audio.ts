import type { Handler } from "../services/event-bus";
import type { Bus, EventValues } from "./types";
import { play, playCharacterNo, playCharacterYes } from "../utils/play";
import { pick } from "../utils/pick";

type Announcement = Handler<EventValues>;

const actionAnnouncement: Announcement = ({ root }) => {
  const { prevQuote, characters } = root;
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
};

const playTheme: Announcement = (() => {
  const lobby = new Audio();
  lobby.src = "/audio/friends-theme-8-bit.mp3";
  lobby.loop = true;
  lobby.controls = true;
  lobby.volume = 0.4;

  return ({ root }) => {
    if (root.allowLobbyAudio) lobby.play();
    else lobby.pause();
  };
})();

export const setupFriendsAudio = ({ on }: Bus) => {
  on("@APP/ANSWER_VALIDATED", actionAnnouncement);
  on("@UI/AUDIO_CLICK", playTheme);
};
