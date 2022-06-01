import { Character } from "../../domain/entities/character";
import type { CharacterDTO } from "../dtos/character-dto";
import type { IMapper } from "./IMapper";

export const characterMapper: IMapper<CharacterDTO[], Character[]> = {
  toEntity: (dto: CharacterDTO[]) => dto.map((c) => new Character(c)),
  toDto: (entity: Character[]): CharacterDTO[] => {
    throw new Error("Not implemented");
  },
};
