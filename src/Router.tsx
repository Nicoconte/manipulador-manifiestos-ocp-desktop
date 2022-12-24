import React from "react";

import {
    createBrowserRouter,
} from "react-router-dom";

import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Repository } from "./pages/Repository";
  
export const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
        path: "/repository/:name",
        element: <Repository />
    },
    {
        path: "*",
        element: <NotFound />
    }
]);