import type { Bus } from "./types";
import { isVariant } from "../services/ab-panel";
import { setupMortalKombatAudio } from "./setup-mortal-kombat-audio";
import { setupFriendsAudio } from "./setup-friends-audio";

export const setupAudio = (bus: Bus) => {
  return isVariant("mortal_kombat")
    ? setupMortalKombatAudio(bus)
    : setupFriendsAudio(bus);
};
