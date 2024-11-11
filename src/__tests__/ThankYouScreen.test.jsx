import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import ThankYouScreen from "../EndScreen/ThankYouScreen";
import { MemoryRouter } from "react-router-dom";

describe("Thank You Screen Component", () => {
  test("Title text", () => {
    render(
      <MemoryRouter>
        <ThankYouScreen />
      </MemoryRouter>
    );
    expect(screen.getByText(/thanks for playing/i)).toBeInTheDocument();
  });

  test("Play again button", () => {
    render(
      <MemoryRouter>
        <ThankYouScreen />
      </MemoryRouter>
    );
    expect(screen.getByText(/play again/i)).toBeInTheDocument();
  });
});
