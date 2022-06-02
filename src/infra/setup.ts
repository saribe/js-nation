import { RootAggregator } from "../domain/value-objects/root-aggregator";
import { createEventBus } from "../services/event-bus";
import { createLogger } from "../services/logger";
import { busDecorator } from "../utils/decorate-bus";
import type { Events, Bus } from "./types";
import { setupApp } from "./setup-app";
import { setupTracking } from "./setup-tracking";
import { setupAudio } from "./setup-audio";

export const setupInfra = () => {
  const bus = createEventBus<Events>();
  const logger = createLogger({ page_name: "HOME" });
  const root = new RootAggregator();
  const sharedBus = busDecorator(bus, root, logger) as Bus;

  setupApp(sharedBus, root);
  setupTracking(sharedBus);
  setupAudio(sharedBus);

  return {
    bus: sharedBus,
  };
};
