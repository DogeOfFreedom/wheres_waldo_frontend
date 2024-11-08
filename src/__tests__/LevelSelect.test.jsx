import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import LevelSelect from "../LevelSelect";

describe("Level Select Component", () => {
  test("Section Header", () => {
    render(<LevelSelect />);
    expect(screen.getByText(/level select/i)).toBeInTheDocument();
  });

  test("3 Levels Available", () => {
    render(<LevelSelect />);
    expect(screen.getAllByTestId("level").length).toBe(3);
  });

  test("Correct Level Names Displayed", () => {
    render(<LevelSelect />);
    expect(screen.getByTestId(/Starlit Street/i).textContent).toBe(
      "Starlit Street"
    );
    expect(screen.getByTestId(/Track & Field/i).textContent).toBe(
      "Track & Field"
    );
    expect(screen.getByTestId(/Snow Day/i).textContent).toBe("Snow Day");
  });
});
