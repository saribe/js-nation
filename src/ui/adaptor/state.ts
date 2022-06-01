import { config } from "../../config";
import type { Character } from "../../domain/entities/character";
import type { Quote } from "../../domain/value-objects/quote";

export type State = {
  characters: Character[];
  prevQuote?: Quote;
  correctCount: number;
  isGameOver: boolean;
  muted: boolean;
  points: number;
  quote?: Quote;
  quotes: Quote[];
  routeTime: number;
};

export const initialState: State = {
  characters: [],
  prevQuote: null,
  correctCount: 0,
  isGameOver: false,
  muted: true,
  points: 0,
  quote: null,
  quotes: [],
  routeTime: config.get("timeout"),
};
