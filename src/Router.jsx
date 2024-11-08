import { createBrowserRouter } from "react-router-dom";
import Redirect from "./Redirect";
import ErrorPage from "./ErrorPage";
import Game from "./Game";
import EndScreen from "./EndScreen";
import Home from "./Home";

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
    element: <Home />,
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
