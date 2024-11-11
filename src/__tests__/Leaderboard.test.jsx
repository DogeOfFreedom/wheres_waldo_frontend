const { render, screen } = require("@testing-library/react");
const { describe, test, expect } = require("vitest");
import Leaderboard from "../Leaderboard";

describe("Leaderboard Component", () => {
  test("Title Text", () => {
    render(<Leaderboard />);
    expect(screen.getByText(/Leaderboard/i)).toBeInTheDocument();
  });

  test("Header Rows", () => {
    render(<Leaderboard />);
    expect(screen.getByText(/rank/i)).toBeInTheDocument();
    expect(screen.getByText(/name/i)).toBeInTheDocument();
    expect(screen.getByText(/time/i)).toBeInTheDocument();
  });
});
