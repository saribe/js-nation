/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import "./game-container.css";
import { Dialog } from "./components/dialog";
import { Timer } from "./components/timer";
import { List } from "./components/list";
import { useProgress } from "./hooks/use-progress";
import { useApp } from "./hooks/use-app";
import { AudioIcon } from "./components/audio-icon";
import { ComboAnimation } from "./components/combo-animation";
import { UnicornPower } from "./components/unicorn-power";

export function GameContainer() {
  const { state, actions } = useApp();
  const {
    characters,
    correctCount,
    isGameOver,
    points,
    quote,
    quotes,
    routeTime,
  } = state;

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

      <Dialog
        open={isGameOver}
        header="Game Over"
        footer="Play again"
        onClick={actions.onPlayAgainClick}
      >
        <p>
          🎉 You got <b>{correctCount}</b> correct answers!
        </p>
        <p>
          <b>Score:</b> {points}
        </p>
      </Dialog>

      <Dialog
        open={!quotes.length}
        header="Hello there 👋"
        footer="Play"
        onClick={actions.onStartPlayClick}
      >
        <p>Hello there, welcome to JS Nation! Let's play friends quotes. </p>
      </Dialog>

      <AudioIcon onClick={actions.onAudioClick} muted={state.muted} />
      <UnicornPower characters={characters} quote={quote} />
      <ComboAnimation quote={state.prevQuote} />
    </article>
  );
}
