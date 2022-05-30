import { useReducer } from "react";
import { useActions } from "./use-actions";
import { reducer } from "../adaptor/reducer";
import { initialState } from "../adaptor/state";
import { useEventsAsActions } from "./use-events-as-actions";
import { useInfra } from "./use-infra";
import { EventKey } from "../../infra/types";

/**
 * @summary Events that the UI have to respond in the reducer
 *
 * Many events that will travel in the event bus are may not be
 * relevant for the ui.
 *
 * @see `../adaptor/reducer`
 */
const EVENTS: EventKey[] = [
  "@APP/ANSWER_VALIDATED",
  "@APP/GAME_DATA_LOADED",
  "@APP/GAME_FINISHED",
  "@APP/NEW_QUOTES_LOADED",
];

/**
 * This is the adaptor in the format of a Hook.
 * Hook that makes the connection between the UI and infra at screen component level
 * Letting the reducer to know about some App events
 */
export const useApp = () => {
  const { bus } = useInfra();
  const [state, dispatch] = useReducer(reducer, initialState);
  const actions = useActions(bus.emit, state);

  // Add subscriptions to ANY event that is relevant to a need of state update.
  useEventsAsActions(EVENTS, bus, dispatch);

  return { actions, state };
};
