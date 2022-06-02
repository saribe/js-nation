/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useReducer, useRef } from "react";
import "./game-container.css";
import { isFeatEnabled } from "../services/feat-panel";
import { Dialog } from "./components/dialog";
import { Timer } from "./components/timer";
import { List } from "./components/list";
import { useProgress } from "./hooks/use-progress";
import { Tracking } from "../services/tracking";
import { quotesRepo } from "../infra/repos/get-quotes";
import { charactersRepo } from "../infra/repos/get-characters";
import { createLogger } from "../services/logger";
import { initialState } from "./adaptor/state";
import { reducer } from "./adaptor/reducer";
import { isVariant } from "../services/ab-panel";
import { play, playCharacterNo, playCharacterYes } from "../utils/play";
import { Character, CharacterId } from "../domain/entities/character";
import { Quote } from "../domain/value-objects/quote";
import { pick } from "../utils/pick";
import { config } from "../config";
import { useActions } from "./hooks/use-actions";

const isUnicornUser = isFeatEnabled("unicorn");
const logger = createLogger({ page_name: "HOME" });
const isMKEnabled = isVariant("mortal_kombat");

export function GameContainer() {
  const { current: tracking } = useRef(new Tracking({ magic: "🪄" }));
  const [state, dispatch] = useReducer(reducer, initialState);
  const valueRef = useRef<CharacterId>();
  const {
    characters,
    correctCount,
    isGameOver,
    logs,
    points,
    quote,
    quotes,
    routeTime,
  } = state;

  const actions = useActions(dispatch, state);

  const nextQuestion = (value: CharacterId = null) => {
    if (isGameOver) return;

    const nextIndex = quotes.indexOf(quote) + 1;
    const updatedQuotes = quotes.map(
      (q, i) => new Quote({ ...q, isActive: i === nextIndex })
    );
    const next = updatedQuotes[nextIndex];
    const isCorrect = quote?.characterId === value;

    valueRef.current = value;
    dispatch({
      type: "@UI/ANSWER_VALIDATED",
      root: { quotes: updatedQuotes, quote: next },
      isCorrect,
    });
  };

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

  const onReady = () => {
    (async () => {
      try {
        const crop = config.get("questions");
        const [quotes, characters] = await Promise.all([
          quotesRepo.get(crop),
          charactersRepo.get(),
        ]);

        dispatch({
          type: "@UI/GAME_DATA_LOADED",
          root: { quotes, characters },
        });
      } catch (error) {
        logger.error(error as Error);
      }
    })();

    tracking.pageView("home");
  };

  const onGameOver = () => {
    if (isGameOver) {
      tracking.track("game_over_screen");

      if (isMKEnabled) {
        setTimeout(() => {
          const allCorrect =
            logs.filter((l) => l.isCorrect).length === logs.length;
          if (allCorrect) play("/audio/flawless-victory.mp3");
        }, 2000);
      }
    }
  };

  const onCharacterClick = (character: Character) => {
    nextQuestion(character.id);
    tracking.track("character_click", { value: character.id });
  };

  const onStartGameClick = async () => {
    const crop = config.get("questions");
    const quotes = await quotesRepo.get(crop);

    tracking.track("start_game_click");
    dispatch({ type: "@UI/NEW_QUOTES_LOADED", root: { quotes } });
  };

  useEffect(actions.onLogsChange, [logs.length]); // play a sound after a round
  useEffect(actions.onGameOver, [isGameOver]); // game is over
  useEffect(actions.onReady, []); // init data

  return (
    <article>
      <img className="logo" src="/img/logo.png" alt="Friends logo" />
      <Timer
        time={routeTime}
        progress={useProgress(quotes)}
        message={quote?.quote}
        onTimeout={actions.onTimeout}
      />

      <List characters={characters} onClick={actions.onCharacterClick} />

      {isUnicornUser && (
        <footer>
          <small>{quote?.characterId}</small>
        </footer>
      )}

      {isGameOver && (
        <Dialog
          open={isGameOver}
          header="Game Over"
          footer="Play again"
          onClick={actions.onStartGameClick}
        >
          <p>
            🎉 You got <b>{correctCount}</b> correct answers!
          </p>
          <p>
            <b>Score:</b> {points}
          </p>
        </Dialog>
      )}
    </article>
  );
}
