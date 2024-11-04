import { createBrowserRouter } from "react-router-dom";
import Redirect from "./Redirect";
import ErrorPage from "./ErrorPage";
import Welcome from "./Welcome";
import LevelSelect from "./LevelSelect";
import Game from "./Game";
import EndScreen from "./EndScreen";

const router = createBrowserRouter([
  {
    index: true,
    element: <Redirect />,
  },
  {
    path: "/",
    element: <Redirect />,
    errorElement: <ErrorPage />,
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
    path: "/Game",
    element: <Game />,
  },
  {
    path: "/End",
    element: <EndScreen />,
  },
]);

export default router;
