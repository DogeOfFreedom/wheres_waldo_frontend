const { render, screen } = require("@testing-library/react");
const { describe, test, expect } = require("vitest");
import ThankYouScreen from "../ThankYouScreen";

describe("Thank You Screen Component", () => {
  test("Title text", () => {
    render(<ThankYouScreen />);
    expect(screen.getByText(/Thanks for playing/i)).toBeInTheDocument();
  });

  test("Play again button", () => {
    render(<ThankYouScreen />);
    expect(screen.getByText(/play again/i)).toBeInTheDocument();
  });
});
