import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Welcome from "../Welcome";
import { MemoryRouter, RouterProvider } from "react-router-dom";
import router from "../Router";

describe("Welcome Component", () => {
  test("Title Text", () => {
    render(
      <MemoryRouter>
        <Welcome />
      </MemoryRouter>
    );
    expect(screen.getByText(/where's/i)).toBeInTheDocument();
    expect(screen.getByText(/waldo?/i)).toBeInTheDocument();
  });

  test("Title Sub Text", () => {
    render(
      <MemoryRouter>
        <Welcome />
      </MemoryRouter>
    );
    expect(screen.getByText(/(Jiachen Si)/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Can someone please find him?/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/I've been looking for days./i)
    ).toBeInTheDocument();
  });

  test("Waldo Images", () => {
    render(
      <MemoryRouter>
        <Welcome />
      </MemoryRouter>
    );
    expect(screen.getByAltText("walkingWaldo")).toBeInTheDocument();
  });

  test("Play Button", () => {
    render(
      <MemoryRouter>
        <Welcome />
      </MemoryRouter>
    );
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
  });
});
