import { createBrowserRouter } from "react-router-dom";
import Redirect from "./Redirect";
import ErrorPage from "./ErrorPage";
import Game from "./Game/Game";
import EndScreen from "./EndScreen/EndScreen";
import Welcome from "./Welcome";
import LevelSelect from "./LevelSelect";

const router = createBrowserRouter([
  {
    index: true,
    element: <Redirect />,
  },
  {
    path: "/",
    element: <Redirect />,
  },
  {
    path: "/Welcome",
    element: <Welcome />,
  },
  {
    path: "/LevelSelect",
    element: <LevelSelect />,
  },
  {
    path: "/Game/:level",
    element: <Game />,
  },
  {
    path: "/End",
    element: <EndScreen />,
  },
  // Catch all error route
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
