/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, useEffect } from "react";
import { Bus, EventKey, EventValues } from "../../infra/types";

type Action = { type: EventKey } & EventValues;

/**
 * Takes an EventType and hooks it to the reducer.
 */
export const useEventsAsActions = (
  events: EventKey[],
  bus: Bus,
  dispatch: Dispatch<Action>
) => {
  useEffect(() => {
    const eventToAction = (type: EventKey) => {
      const fn = (detail: EventValues) => dispatch({ type, ...detail });

      bus.on(type, fn);
      return { fn, type };
    };

    const subscriptions = events.map(eventToAction);

    return () => subscriptions.forEach(({ type, fn }) => bus.off(type, fn));
  }, []);
};
