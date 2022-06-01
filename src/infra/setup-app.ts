import { FriendsApp } from "../app/friends-app";
import { RootAggregator } from "../domain/value-objects/root-aggregator";
import { charactersRepo } from "./repos/get-characters";
import { quotesRepo } from "./repos/get-quotes";
import type { Bus } from "./types";

export const setupApp = ({ on, emit }: Bus, root: RootAggregator) => {
  const repos = { quotes: quotesRepo, characters: charactersRepo };
  const app = new FriendsApp(root, repos);

  on("@UI/START_PLAY_CLICK", async () => {
    await app.createGame();
    emit("@APP/GAME_DATA_LOADED");
  });

  on("@UI/CHARACTER_CLICK", ({ character }) => {
    app.playRound(character);
    emit("@APP/ANSWER_VALIDATED");
  });

  on("@UI/TIMEOUT", () => {
    app.timeout();
    emit("@APP/ANSWER_VALIDATED");
  });

  on("@APP/ANSWER_VALIDATED", ({ root }) => {
    if (!root.quote) emit("@APP/GAME_FINISHED");
  });

  on("@UI/PLAY_AGAIN_CLICK", async () => {
    await app.loadNewGame();
    emit("@APP/NEW_QUOTES_LOADED");
  });

  on("@UI/AUDIO_CLICK", () => {
    app.toggleLobbyAudion();
    emit("@APP/LOBBY_AUDIO_UPDATED");
  });

  return app;
};
