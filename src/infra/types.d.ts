import type { Character } from "../domain/entities/character";
import type { RootAggregator } from "../domain/value-objects/root-aggregator";
import type { EventBus } from "../services/event-bus";

type Root = Partial<RootAggregator>;
export type Bus = EventBus<Events>;
export type EventKey = keyof Events;
export type EventValues = Events[EventKey];
export type Events = {
  "@APP/ANSWER_VALIDATED": { root?: Root; isCorrect: boolean };
  "@APP/GAME_DATA_LOADED": { root?: Root };
  "@APP/GAME_DATA_LOAD_FAIL": { root?: Root; error: Error };
  "@APP/NEW_QUOTES_LOADED": { root?: Root };
  "@APP/NEW_QUOTES_LOAD_FAIL": { root?: Root; error: Error };
  "@UI/CHARACTER_CLICK": { root?: Root; character: Character };
  "@UI/PAGE_READY": { root?: Root };
  "@UI/START_GAME_CLICK": { root?: Root };
};
