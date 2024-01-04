import { createBrowserRouter } from "react-router-dom";
import OpenLayout from "../components/layout/OpenLayout";
import Home from "../pages/Home/Home";
import Signup from "../pages/Signup/Signup";
import NotFound from "../common/NotFound";
import Login from "../pages/Login/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <OpenLayout></OpenLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <Signup></Signup>,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
