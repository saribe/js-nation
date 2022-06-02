import { isFeatEnabled } from "./services/feat-panel";

const isVIPUser = isFeatEnabled("vip");
const data = {
  timeout: isVIPUser ? 10000 : 8000,
  minPoints: isVIPUser ? 75 : 50,
  questions: 6,
};

type Keys = keyof typeof data;

export const config = {
  get: (id: Keys) => data[id],
  set: (id: Keys, value: any) => {
    data[id] = value;
  },
};
