import { createBrowserRouter } from "react-router-dom";
import OpenLayout from "../components/layout/OpenLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import NotFound from "../common/NotFound";


export const router= createBrowserRouter([

    {
        path:'/',
        element:<OpenLayout></OpenLayout>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/signup',
                element:<Signup></Signup>
            },
        ]
    },
    {
        path: "*",
        element: <NotFound />,
      },
])