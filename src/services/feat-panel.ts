import { getCookie } from "../utils/cookies";

type Features = { [key in string]: boolean };

const getFeatures = (): Features =>
  (getCookie("FeatPanel") ?? "")
    .split("#")
    .reduce((acc, id) => ({ ...acc, [id]: true }), {});

const allocations = getFeatures();

export const isFeatEnabled = (id: string) => allocations[id];
