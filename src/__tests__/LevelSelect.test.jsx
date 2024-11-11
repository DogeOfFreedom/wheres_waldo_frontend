import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import LevelSelect from "../LevelSelect";
import { MemoryRouter } from "react-router-dom";

describe("Level Select Component", () => {
  test("Section Header", () => {
    render(
      <MemoryRouter>
        <LevelSelect />
      </MemoryRouter>
    );
    expect(screen.getByText(/level select/i)).toBeInTheDocument();
  });

  test("3 Levels Available", () => {
    render(
      <MemoryRouter>
        <LevelSelect />
      </MemoryRouter>
    );
    expect(screen.getAllByTestId("level").length).toBe(3);
  });

  test("Correct Level Names Displayed", () => {
    render(
      <MemoryRouter>
        <LevelSelect />
      </MemoryRouter>
    );
    expect(screen.getByTestId(/Starlit Street/i).textContent).toBe(
      "Starlit Street"
    );
    expect(screen.getByTestId(/Track & Field/i).textContent).toBe(
      "Track & Field"
    );
    expect(screen.getByTestId(/Snow Day/i).textContent).toBe("Snow Day");
  });
});
