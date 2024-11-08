import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Welcome from "../Welcome";

describe("Welcome Component", () => {
  test("Title Text", () => {
    render(<Welcome />);
    expect(screen.getByText(/where's/i)).toBeInTheDocument();
    expect(screen.getByText(/waldo?/i)).toBeInTheDocument();
  });

  test("Title Sub Text", () => {
    render(<Welcome />);
    expect(screen.getByText(/(Jiachen Si)/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Can someone please find him?/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/I've been looking for days./i)
    ).toBeInTheDocument();
  });

  test("Waldo Images", () => {
    render(<Welcome />);
    expect(screen.getByAltText("waldoHead")).toBeInTheDocument();
    expect(screen.getByAltText("walkingWaldo")).toBeInTheDocument();
  });
});
