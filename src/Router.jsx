import { createBrowserRouter } from "react-router-dom";
import Redirect from "./Redirect";
import ErrorPage from "./ErrorPage";
import Game from "./Game";
import EndScreen from "./EndScreen/EndScreen";
import Welcome from "./Welcome";
import LevelSelect from "./LevelSelect";

const router = createBrowserRouter([
  {
    index: true,
    element: <Redirect />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <Redirect />,
  },
  {
    path: "/Welcome",
    element: <Welcome />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/LevelSelect",
    element: <LevelSelect />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Game/:levelName",
    element: <Game />,
    // errorElement: <ErrorPage />,
  },
  {
    path: "/End/:levelName",
    element: <EndScreen />,
    errorElement: <ErrorPage />,
  },
  // Catch all error route
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
