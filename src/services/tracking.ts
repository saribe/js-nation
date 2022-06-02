import { obj2query } from "../utils/obj2query";

const track = (eventName: string, data?: any) => {
  const query = obj2query({
    e: eventName,
    ts: Date.now(),
    env: process.env.NODE_ENV,
    ...data,
  });

  return fetch(`${process.env.REACT_APP_TRACKING}?${query}`);
};

export class Tracking {
  private meta: any;

  constructor(meta?: any) {
    this.meta = meta;
  }

  pageView = (eventName: string, data?: any) => {
    track(eventName, { t: "page_view", ...data, ...this.meta });
  };

  track = (eventName: string, data?: any) => {
    track(eventName, { t: "event", ...data, ...this.meta });
  };
}
