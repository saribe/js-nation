import type { Bus } from "./types";
import { setupMortalCombatAudio } from "./setup-mortal-combat-audio";
import { isVariant } from "../services/ab-panel";
import { setupFriendsAudio } from "./setup-friends-audio";

export const setupAudio = (bus: Bus) => {
  return isVariant("mortal_combat")
    ? setupMortalCombatAudio(bus)
    : setupFriendsAudio(bus);
};
