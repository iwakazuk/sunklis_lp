import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import DiagnosisPage from "../pages/diagnosis/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/diagnosis",
    element: <DiagnosisPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
