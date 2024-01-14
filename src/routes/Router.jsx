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
import PrivateLayout from "../components/layout/PrivateLayout";
import Dashboard from "../components/layout/Dashboard";
import AllUsers from "../pages/Dashboard/AllUsers";
import AdminHome from "../pages/Dashboard/AdminHome";

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
    path: "/feedback",
    element: (
      <OpenLayout>
        <TabContent />
      </OpenLayout>
    ),
    children: [
      {
        path: "feature-requests",
        element: <FeatureRequests />,
      },
      {
        path: "features/:id", 
        element: <SingleFeatures />,
      },
    ],
  },
  {
    path: "/bugs",
    element: (
      <OpenLayout>
        <TabContent />
        <Bugs />
      </OpenLayout>
    ),
  },
  {
    path: "/database-requests",
    element: (
      <OpenLayout>
        <TabContent />
        <DatabaseRequest />
      </OpenLayout>
    ),
  },
  {
    path:'/dashboard',
    element:<PrivateLayout><Dashboard></Dashboard></PrivateLayout>,
    children:[
      {
        path:'allusers',
        element:<AllUsers></AllUsers>
      },
      {
        path:'adminHome',
        element:<AdminHome></AdminHome>
      }
    ]
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);
