import type { Character } from "../entities/character";
import type { Quote } from "./quote";

export class RootAggregator {
  characters: Character[];
  quotes: Quote[];
  quote: Quote;
}
