import type { Character } from "../../domain/entities/character";
import type { Quote } from "../../domain/value-objects/quote";
import { isFeatEnabled } from "../../services/feat-panel";

type Props = { characters: Character[]; quote?: Quote };

const isUnicornUser = isFeatEnabled("unicorn");

export const UnicornPower = ({ characters, quote }: Props) =>
  quote &&
  isUnicornUser && (
    <footer className="unicorn">
      <small>{characters.find((c) => c.id === quote?.characterId)?.name}</small>
    </footer>
  );
