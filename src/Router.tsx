import React from "react";

import {
    createBrowserRouter,
} from "react-router-dom";
import { Applications } from "./pages/Applications";

import { Home } from "./pages/Home";
import { Projects } from "./pages/Projects";
  
export const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
        path: "/repository/:name",
        element: <Projects />,
    },
    {
        path: "/project/:project_name",
        element: <Applications />
    }
]);