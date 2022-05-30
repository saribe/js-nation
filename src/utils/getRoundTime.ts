import { config } from "../config";
import { isFeatEnabled } from "../services/feat-panel";

const timeout = config.get("timeout");
const isVIPUser = isFeatEnabled("vip");

export const getRouteTime = () => (isVIPUser ? timeout * 1.25 : timeout);
