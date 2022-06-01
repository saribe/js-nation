import type { EventBus } from "../services/event-bus";
import type { Logger } from "../services/logger";

const isProd = process.env.NODE_ENV === "production";

export const busDecorator = (
  bus: EventBus<any>,
  root: any,
  logger?: Logger
) => {
  const emit = bus.emit;

  bus.emit = ((type, payload) => {
    const data = { root, ...payload };

    logger?.debug(type, data);
    emit(type, isProd ? data : Object.freeze(data));
  }) as typeof bus.emit;

  return bus;
};
