import { FriendsApp } from "../app/friends-app";
import { RootAggregator } from "../domain/value-objects/root-aggregator";
import { charactersRepo } from "./repos/get-characters";
import { quotesRepo } from "./repos/get-quotes";
import type { Bus } from "./types";

export const setupApp = ({ on, emit }: Bus, root: RootAggregator) => {
  const repos = { quotes: quotesRepo, characters: charactersRepo };
  const app = new FriendsApp(root, repos);

  on("@UI/PAGE_READY", async () => {
    try {
      const root = await app.createGame();
      emit("@APP/GAME_DATA_LOADED", { root });
    } catch (error: any) {
      emit("@APP/GAME_DATA_LOAD_FAIL", { error });
    }
  });

  return app;
};
