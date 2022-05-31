import type { Bus } from "./types";
import { setupMortalKombatAudio } from "./setup-mortal-kombat-audio";
import { isVariant } from "../services/ab-panel";
import { setupFriendsAudio } from "./setup-friends-audio";

export const setupAudio = (bus: Bus) => {
  return isVariant("mortal_combat")
    ? setupMortalKombatAudio(bus)
    : setupFriendsAudio(bus);
};
