import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Leaderboard from "../EndScreen/Leaderboard";

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
