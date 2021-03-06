import type { Character } from "../domain/entities/character";
import type { RootAggregator } from "../domain/value-objects/root-aggregator";
import type { EventBus } from "../services/event-bus";

type Root = Partial<RootAggregator>;
export type Bus = EventBus<Events>;
export type EventKey = keyof Events;
export type EventValues = Events[EventKey];
export type Events = {
  "@APP/ANSWER_VALIDATED": { root?: Root };
  "@APP/GAME_DATA_LOADED": { root?: Root };
  "@APP/GAME_DATA_LOAD_FAIL": { root?: Root; error: Error };
  "@APP/GAME_FINISHED": { root?: Root };
  "@APP/LOBBY_AUDIO_UPDATED": { root?: Root };
  "@APP/NEW_QUOTES_LOADED": { root?: Root };
  "@APP/NEW_QUOTES_LOAD_FAIL": { root?: Root; error: Error };
  "@UI/AUDIO_CLICK": { root?: Root };
  "@UI/CHARACTER_CLICK": { root?: Root; character: Character };
  "@UI/PAGE_READY": { root?: Root };
  "@UI/PLAY_AGAIN_CLICK": { root?: Root };
  "@UI/START_PLAY_CLICK": { root?: Root };
  "@UI/TIMEOUT": { root?: Root };
};
