import { config } from "../../config";
import type { Character } from "../../domain/entities/character";
import type { Quote } from "../../domain/value-objects/quote";

export type State = {
  characters: Character[];
  correctCount: number;
  isGameOver: boolean;
  points: number;
  quote?: Quote;
  quotes: Quote[];
  routeTime: number;
};

export const initialState: State = {
  characters: [],
  correctCount: 0,
  isGameOver: false,
  points: 0,
  quote: null,
  quotes: [],
  routeTime: config.get("timeout"),
};
