import type { Character } from "../../domain/entities/character";
import type { Quote } from "../../domain/value-objects/quote";
import { getRouteTime } from "../../utils/getRoundTime";

type Log = { isCorrect: boolean; time: number };

export type State = {
  characters: Character[];
  correctCount: number;
  isGameOver: boolean;
  logs: Log[];
  points: number;
  quote?: Quote;
  quotes: Quote[];
  routeTime: number;
  timeStamp: number;
};

export const initialState: State = {
  characters: [],
  correctCount: 0,
  isGameOver: false,
  logs: [],
  points: 0,
  quote: null,
  quotes: [],
  routeTime: getRouteTime(),
  timeStamp: Date.now(),
};
