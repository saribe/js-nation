import { Quote } from "../../domain/value-objects/quote";
import type { QuoteDTO } from "../dtos/quote-dto";
import type { IMapper } from "./IMapper";

export const quotesMapper: IMapper<QuoteDTO[], Quote[]> = {
  toEntity: (dto: QuoteDTO[]) =>
    dto.map(
      (q) =>
        new Quote({
          characterId: q.character.toLocaleLowerCase() as null,
          quote: q.quote,
        })
    ),
  toDto: (entity: Quote[]): QuoteDTO[] => {
    throw new Error("Not implemented");
  },
};
