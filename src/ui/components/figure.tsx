import { Character } from "../../domain/entities/character";

type CharacterParams = {
  character: Character;
  onClick?: (character: Character) => void;
};

export const CharacterFigure = ({ character, onClick }: CharacterParams) => (
  <figure onClick={onClick ? () => onClick(character) : null}>
    <img src={character.photo} alt={character.name} />
    <figcaption>{character.name}</figcaption>
  </figure>
);
