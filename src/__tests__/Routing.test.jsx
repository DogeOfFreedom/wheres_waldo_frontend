/* eslint-disable react/display-name */
import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import router from "../Router";

vi.mock("../EndScreen/EndScreen", () => {
  return {
    default: () => <div data-testid="EndScreenMock"></div>,
  };
});
vi.mock("../Welcome", () => {
  return {
    default: () => <div data-testid="WelcomeMock"></div>,
  };
});
vi.mock("../LevelSelect", () => {
  return {
    default: () => <div data-testid="LevelSelectMock"></div>,
  };
});
vi.mock("../Game/Game", () => {
  return {
    default: () => <div data-testid="GameMock"></div>,
  };
});
vi.mock("../ErrorPage", () => {
  return {
    default: () => <div data-testid="ErrorMock"></div>,
  };
});
vi.mock("../Redirect", () => {
  return {
    default: () => <div data-testid="RedirectMock"></div>,
  };
});

describe("Routing", () => {
  const renderRouter = (initialEntries) => {
    const memoryRouter = createMemoryRouter(router.routes, { initialEntries });
    render(<RouterProvider router={memoryRouter} />);
  };

  test("Renders Welcome Page on /Welcome", () => {
    renderRouter(["/Welcome"]);
    expect(screen.getByTestId("WelcomeMock")).toBeInTheDocument();
  });

  test("Renders Redirect Screen on /", () => {
    renderRouter(["/"]);
    expect(screen.getByTestId("RedirectMock")).toBeInTheDocument();
  });

  test("Renders Level Select on /LevelSelect", () => {
    renderRouter(["/LevelSelect"]);
    expect(screen.getByTestId("LevelSelectMock")).toBeInTheDocument();
  });

  test("Renders Game on /Game/Snow Day", () => {
    renderRouter(["/Game/Snow Day"]);
    expect(screen.getByTestId("GameMock")).toBeInTheDocument();
  });

  test("Renders Error Page on /Game/", () => {
    renderRouter(["/Game/"]);
    expect(screen.getByTestId("ErrorMock")).toBeInTheDocument();
  });

  test("Renders End Screen on /EndScreen", () => {
    renderRouter(["/End"]);
    expect(screen.getByTestId("EndScreenMock")).toBeInTheDocument();
  });

  test("Renders Error Page on bad urls", () => {
    renderRouter(["/cheeki_url"]);
    expect(screen.getByTestId("ErrorMock")).toBeInTheDocument();
  });
});
