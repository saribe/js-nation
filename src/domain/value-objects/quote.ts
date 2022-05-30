import { ValueObject } from "../core/value-object";
import { CharacterId } from "../entities/character";

export class Quote extends ValueObject<Quote> {
  answer: CharacterId;
  characterId: CharacterId;
  isActive: boolean;
  quote: string;
  time: number;
  isCombo: boolean;
  isAntiCombo: boolean;

  constructor(init: Partial<Quote>) {
    super();

    this.answer = init.answer;
    this.characterId = init.characterId;
    this.isActive = Boolean(init.isActive);
    this.isAntiCombo = Boolean(init.isAntiCombo);
    this.isCombo = Boolean(init.isCombo);
    this.quote = init.quote;
    this.time = init.time;
  }

  get isCorrect() {
    return this.characterId === this.answer;
  }
}
