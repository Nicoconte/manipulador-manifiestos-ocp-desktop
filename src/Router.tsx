import React from "react";

import {
    createBrowserRouter,
} from "react-router-dom";

import { Home } from "./pages/Home";
import { Error } from "./components/Error";
import { Repository } from "./pages/Repository";
  
export const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <Error />
    },
    {
        path: "/repository/:name",
        element: <Repository />,
        errorElement: <Error />        
    },
    {
        path: "*",
        element: <Error />
    }
]);