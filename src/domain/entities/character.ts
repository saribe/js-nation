import { Entity } from "../core/entity";

export type Lexeme = `/audio/${string}.mp3`;
export type CharacterId =
  | "chandler"
  | "joey"
  | "monica"
  | "phoebe"
  | "rachel"
  | "ross";

export class Character extends Entity<CharacterId> {
  name: string;
  shortName: string;
  photo: `https://${string}`;
  lexical: {
    no: Lexeme[];
    yes: Lexeme[];
    hello: Lexeme[];
  };

  constructor(init: Partial<Character> = {}) {
    super(init);

    this.shortName = init.shortName;
    this.name = init.name;
    this.photo = init.photo;
    this.lexical = { no: [], yes: [], hello: [], ...init.lexical };
  }
}
