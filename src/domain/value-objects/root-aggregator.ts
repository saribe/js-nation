import { config } from "../../config";
import type { Character } from "../entities/character";
import type { Quote } from "./quote";

const TIMEOUT = config.get("timeout");
const MIN_POINTS = config.get("minPoints");

export class RootAggregator {
  characters: Character[];
  quotes: Quote[];
  private timeStamp: number;
  private activeIndex: number;

  constructor(init: Partial<RootAggregator> = {}) {
    this.characters = init.characters || [];
    this.quotes = init.quotes || [];
    this.activeIndex = Math.max(this.quotes.findIndex((q) => q.isActive) || 0);
  }

  get correctCount() {
    return this.quotes.filter((l) => l.isCorrect).length;
  }

  get quote() {
    return this.quotes[this.activeIndex];
  }

  get prevQuote() {
    return this.quotes[this.activeIndex - 1];
  }

  get points() {
    let combo = 0;
    return this.quotes.reduce((acc, q) => {
      if (!q.isCorrect) {
        combo = 0;
        return acc;
      }

      const multiplier = ++combo >= 3 ? 1.5 : 1;
      const points = (TIMEOUT - Math.min(TIMEOUT - MIN_POINTS, q.time)) / 4;

      return acc + Math.floor(points * multiplier);
    }, 0);
  }

  setRoundTimeout() {
    this.quote.answer = null;
    this.quote.time = TIMEOUT;
    this.timeStamp = Date.now();
    this.updateQuotes();
  }

  setRoundValue(character: Character) {
    if (!this.quote) throw new Error("No active quote to vote on!");

    this.quote.answer = character.id;
    this.quote.time = Date.now() - this.timeStamp;
    this.timeStamp = Date.now();
    this.updateQuotes();
  }

  newGame(quotes: Quote[], characters = this.characters) {
    this.characters = characters;
    this.quotes = quotes;
    this.updateQuotes();
    this.timeStamp = Date.now();
    this.activeIndex = 0;
  }

  private updateQuotes() {
    this.activeIndex += 1;
    this.quotes.forEach((q, i, quotes) => {
      const sample = quotes.slice(Math.max(i - 2), i + 1);
      q.isActive = i === this.activeIndex;

      if (sample.length < 3) return;
      q.isAntiCombo = sample.every((a) => a.answer && !a.isCorrect);
      q.isCombo = sample.every((a) => a.answer && a.isCorrect);
    });
  }
}
