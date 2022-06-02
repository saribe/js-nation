import type { QuoteDTO } from "../dtos/quote-dto";
import { quotesMapper } from "../mappers/quotes-mapper";

export const quotesRepo = {
  get: async (crop: number) => {
    const { REACT_APP_EXTERNAL_API } = process.env;
    const response = await fetch(`${REACT_APP_EXTERNAL_API}/quotes/${crop}`);
    const dto: QuoteDTO[] = await response.json();

    return quotesMapper.toEntity(dto);
  },
};
