import { ValueObject } from "../core/value-object";

export class Quote extends ValueObject<Quote> {
  quote: string;
  characterId: string;
  isActive: boolean;

  constructor(init: Partial<Quote>) {
    super();

    this.characterId = init.characterId;
    this.isActive = Boolean(init.isActive);
    this.quote = init.quote;
  }
}
