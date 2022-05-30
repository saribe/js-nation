import { useRef } from "react";
import { setupInfra } from "../../infra/setup";

/**
 * @summary it main purpose is to held a singleton of the setup infra result
 */
export const useInfra = () => {
  const ref = useRef<ReturnType<typeof setupInfra>>();

  if (!ref.current) {
    ref.current = setupInfra();
  }

  return ref.current;
};
