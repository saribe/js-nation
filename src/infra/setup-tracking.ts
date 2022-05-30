import { Tracking } from "../services/tracking";
import type { Bus } from "./types";

export const setupTracking = (bus: Bus) => {
  const tracking = new Tracking({ magic: "🪄" });

  bus.on("@UI/PAGE_READY", () => tracking.pageView("home"));
  bus.on("@UI/START_GAME_CLICK", () => tracking.track("start_game_click"));
  //TASK: ... others

  return tracking;
};
