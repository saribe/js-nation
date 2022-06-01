import type { Quote } from "../../domain/value-objects/quote";

export const useProgress = (quotes: Quote[]) => {
  const index = quotes.findIndex((q) => q.isActive) + 1;

  return index ? `${index}/${quotes.length}` : "🎉";
};
