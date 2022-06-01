import { getCookie } from "../utils/cookies";

type Experiments = { [key in string]: "a" | "b" };
const hit: { [key in string]: true } = {};

const getTests = (): Experiments =>
  (getCookie("ABPanel") ?? "")
    .split("#")
    .map((ex) => ex.split(":"))
    .reduce((acc, [id, variance]) => ({ ...acc, [id]: variance }), {});

const allocations = getTests();

export const getVariant = (id: string) => {
  if (!hit[id]) {
    hit[id] = true;
    fetch(`${process.env.REACT_APP_AB_PANEL}?hit=${id}`);
  }

  return allocations[id];
};
export const isControl = (id: string) => getVariant(id) !== "b";
export const isVariant = (id: string) => getVariant(id) === "b";
