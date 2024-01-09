import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Router.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./context/UserProvider.jsx";
import { FeatureProvider } from "./context/FeatureProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FeatureProvider>
      <UserProvider>
        <ToastContainer />
        <RouterProvider router={router}></RouterProvider>
      </UserProvider>
    </FeatureProvider>
  </React.StrictMode>
);
