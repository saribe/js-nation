import type { CharacterDTO } from "../dtos/character-dto";
import { characterMapper } from "../mappers/character-mapper";

export const charactersRepo = {
  get: async () => {
    const { REACT_APP_API } = process.env;
    const response = await fetch(`${REACT_APP_API}/character`);
    const dto: CharacterDTO[] = await response.json();

    return characterMapper.toEntity(dto);
  },
};
