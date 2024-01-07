import { createBrowserRouter } from "react-router-dom";
import OpenLayout from "../components/layout/OpenLayout";
import Home from "../pages/Home/Home";
import Signup from "../pages/Signup/Signup";
import NotFound from "../common/NotFound";
import Login from "../pages/Login/Login";
import FeatureRequests from "../components/FeatureRequests/FeatureRequests";
import TabContent from "../components/TabContent/TabContent";
import Bugs from "../components/Bugs/Bugs";
import DatabaseRequest from "../components/DatabaseRequest/DatabaseRequest";
import SingleFeatures from "../components/FeatureRequests/SingleFeatures";

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
      {
        path: "/features/:id", 
        element: <SingleFeatures />,
      },
     
    ],
  },
  {
    path: "/feedback",
    element: (
      <OpenLayout>
        <TabContent>
           </TabContent>
      </OpenLayout>
    ),
    children: [
      {
        path: "feature-requests",
        element: <FeatureRequests />,
      },
     
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);
