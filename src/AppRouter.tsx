import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import ErrorFallBack from "./pages/Error/ErrorFallBack";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorFallBack/>
  },
]);

export default router;
