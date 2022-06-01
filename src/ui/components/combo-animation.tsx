import { memo } from "react";
import { Quote } from "../../domain/value-objects/quote";
import { isVariant } from "../../services/ab-panel";

type Props = { quote: Quote };

const isMK = isVariant("mortal_kombat");
const src = `/img/${isMK ? "dan" : "janice"}.png`;

export const ComboAnimation = memo(
  ({ quote }: Props) =>
    quote?.isCombo && (
      <img
        key={quote.time}
        src={src}
        alt="combo person"
        className="combo combo-animation"
      />
    )
);
