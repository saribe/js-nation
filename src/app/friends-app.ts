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
    const [quotes, characters] = await Promise.all([
      this.getQuotes(),
      this.getCharacters(),
    ]);

    this.root.newGame(quotes, characters);
  };

  loadNewGame = async () => {
    const quotes = await this.getQuotes();

    this.root.newGame(quotes);
  };

  playRound = (character: Character) => {
    this.root.setRoundValue(character);
  };

  timeout = () => {
    this.root.setRoundTimeout();
  };

  toggleLobbyAudion = () => {
    this.root.allowLobbyAudio = !this.root.allowLobbyAudio;
  };

  private getQuotes() {
    const crop = config.get("questions");
    return this.repos.quotes.get(crop);
  }

  private getCharacters() {
    return this.repos.characters.get();
  }
}
