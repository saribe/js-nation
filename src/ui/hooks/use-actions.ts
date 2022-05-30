/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useRef } from "react";
import { State } from "../adaptor/state";
import { Tracking } from "../../services/tracking";
import { Character, CharacterId } from "../../domain/entities/character";
import { isVariant } from "../../services/ab-panel";
import { quotesRepo } from "../../infra/repos/get-quotes";
import { play, playCharacterNo, playCharacterYes } from "../../utils/play";
import { pick } from "../../utils/pick";
import { config } from "../../config";
import { Bus } from "../../infra/types";

type Log = State["logs"][0];

const isMKEnabled = isVariant("mortal_combat");
const getCorrectCount = (logs: Log[]) => logs.filter((l) => l.isCorrect).length;

export const useActions = (emit: Bus["emit"], state: State) => {
  const { current: tracking } = useRef<Tracking>(new Tracking({ magic: "🪄" }));
  const { isGameOver, logs, quote, quotes, characters } = state;
  const valueRef = useRef<CharacterId>();

  const nextQuestion = (value: CharacterId = null) => {
    if (isGameOver) return;

    const nextIndex = quotes.findIndex((q) => q.isActive) + 1;
    quotes.forEach((q, i) => (q.isActive = i === nextIndex));

    valueRef.current = value;
    emit("@APP/ANSWER_VALIDATED", {
      isCorrect: quote?.characterId === value,
      root: { quotes: quotes, quote: quotes[nextIndex] },
    });
  };

  const onTimeout = useCallback(() => nextQuestion(null), [quotes.length]);

  const onStartGameClick = useCallback(async () => {
    const crop = config.get("questions");
    const quotes = await quotesRepo.get(crop);

    tracking.track("start_game_click");
    emit("@APP/NEW_QUOTES_LOADED", { root: { quotes } });
  }, []);

  const onCharacterClick = useCallback(
    (character: Character) => {
      const characterId = character.id;

      nextQuestion(characterId);
      tracking.track("character_click", { value: characterId });
    },
    [nextQuestion]
  );

  const onGameOver = () => {
    if (isGameOver) {
      tracking.track("game_over_screen");

      if (isMKEnabled) {
        setTimeout(() => {
          const allCorrect = getCorrectCount(logs) === logs.length;
          if (allCorrect) play("/audio/flawless-victory.mp3");
        }, 2000);
      }
    }
  };

  const onReady = () => emit("@UI/PAGE_READY");

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
          isMKEnabled
            ? pick(["/audio/superb.mp3", "/audio/brutal.mp3"])
            : "/audio/a-geek.mp3"
        );
        tracking.track("media_play", { type: "audio", lexeme: "combo" });
        break;

      case unlucky:
        play(
          isMKEnabled
            ? "/audio/baby.mp3"
            : "/audio/you-are-totally-making-this-up.mp3"
        );
        tracking.track("media_play", { type: "audio", lexeme: "fatality" });
        break;

      case logs[logs.length - 1].isCorrect:
        if (isMKEnabled) {
          play("/audio/well-done.mp3");
        } else {
          playCharacterYes(characters, value);
        }
        tracking.track("media_play", { type: "audio", lexeme: "yes" });
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
        tracking.track("media_play", { type: "audio", lexeme: "no" });
        break;

      default: //time out
        if (isMKEnabled) {
          play(pick(["/audio/waiting.mp3"]));
        } else {
          const random = pick(characters);
          play(pick(random.lexical.hello));
        }
        tracking.track("media_play", { type: "audio", lexeme: "hello" });
        break;
    }
  };

  return {
    onCharacterClick,
    onGameOver,
    onReady,
    onStartGameClick,
    onTimeout,
    onLogsChange: playVoice,
  };
};
