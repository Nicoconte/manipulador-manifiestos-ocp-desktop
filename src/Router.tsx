import React from "react";

import {
    createBrowserRouter,
} from "react-router-dom";
import { Project } from "./pages/Project";

import { Home } from "./pages/Home";
import { Repository } from "./pages/Repository";
  
export const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
        path: "/repository/:name",
        element: <Repository />,
    },
    {
        path: "/project/:project_name",
        element: <Project />
    }
]);