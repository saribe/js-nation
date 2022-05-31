import { Tracking } from "../services/tracking";
import type { Bus } from "./types";

export const setupTracking = ({ on }: Bus) => {
  const tracking = new Tracking({ magic: "🪄" });
  const { pageView, track } = tracking;

  on("@UI/PAGE_READY", () => pageView("home"));
  on("@UI/PLAY_AGAIN_CLICK", () => track("PLAY_AGAIN_CLICK"));
  on("@APP/GAME_FINISHED", () => track("game_over_screen"));
  on("@UI/CHARACTER_CLICK", ({ character: { id } }) =>
    track("character_click", { id })
  );

  //TASK: ... others

  return tracking;
};
