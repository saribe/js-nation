import type { Character } from "../../domain/entities/character";
import { CharacterFigure } from "./figure";

type CharacterParams = {
  characters: Character[];
  onClick?: (character: Character) => void;
};

export const List = ({ characters, onClick }: CharacterParams) => (
  <ul className="App-list">
    {characters.map((character) => (
      <li onClick={() => onClick(character)} key={character.id}>
        <CharacterFigure character={character} />
      </li>
    ))}
  </ul>
);
