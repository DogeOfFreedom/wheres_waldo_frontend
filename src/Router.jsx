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
    errorElement: <ErrorPage />,
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
    path: "/Game/:level",
    element: <Game />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/End",
    element: <EndScreen />,
    errorElement: <ErrorPage />,
  },
]);

export default router;
