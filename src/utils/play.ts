import type {
  Character,
  CharacterId,
  Lexeme,
} from "../domain/entities/character";
import { pick } from "./pick";

export const play = (() => {
  let audio = new Audio();
  return (src: Lexeme) => {
    audio.src = src;
    return audio.play();
  };
})();

export const playCharacterNo = (
  characters: Character[],
  value: CharacterId
) => {
  const match = characters.find((a) => a.id === value);
  play(pick(match?.lexical?.no));
};

export const playCharacterYes = (
  characters: Character[],
  value: CharacterId
) => {
  const match = characters.find((a) => a.id === value);
  play(pick(match?.lexical?.yes));
};
