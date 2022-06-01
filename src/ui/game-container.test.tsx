import { render, screen } from "@testing-library/react";
import { GameContainer } from "./game-container";

test("renders learn react link", () => {
  render(<GameContainer />);
  const linkElement = screen.getByText(/Who said/i);
  expect(linkElement).toBeInTheDocument();
});
