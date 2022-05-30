import { config } from "../config";
import type { Character } from "../domain/entities/character";
import type { Quote } from "../domain/value-objects/quote";
import type { RootAggregator } from "../domain/value-objects/root-aggregator";

type Repos = {
  characters: { get(): Promise<Character[]> };
  quotes: { get(crop: number): Promise<Quote[]> };
};

export class FriendsApp {
  constructor(public root: RootAggregator, private repos: Repos) {}

  createGame = async () => {
    const crop = config.get("questions");
    const [quotes, characters] = await Promise.all([
      this.repos.quotes.get(crop),
      this.repos.characters.get(),
    ]);

    this.root.characters = characters;
    this.root.quotes = quotes;
    this.root.quote = quotes[0];

    return this.root;
  };
}
