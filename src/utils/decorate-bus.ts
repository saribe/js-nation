import type { EventBus } from "../services/event-bus";
import type { Logger } from "../services/logger";

export const busDecorator = (
  bus: EventBus<any>,
  root: any,
  logger?: Logger
) => {
  const emit = bus.emit;

  bus.emit = ((type, payload) => {
    const data = { root, ...payload };

    logger?.debug(type, data);
    emit(type, data);
  }) as typeof bus.emit;

  return bus;
};
