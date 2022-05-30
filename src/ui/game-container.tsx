/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import "./game-container.css";
import { isFeatEnabled } from "../services/feat-panel";
import { Dialog } from "./components/dialog";
import { Timer } from "./components/timer";
import { List } from "./components/list";
import { useProgress } from "./hooks/use-progress";
import { useApp } from "./hooks/use-app";

const isUnicornUser = isFeatEnabled("unicorn");

export function GameContainer() {
  const { state, actions } = useApp();
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
