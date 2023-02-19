import React from "react";

import {
    createBrowserRouter,
} from "react-router-dom";

import { Home } from "./pages/Home";
import { Error } from "./components/Error";
import { Repository } from "./pages/Repository";
import { ManifestEditor } from "./pages/Repository/MainContent/Applications/ManifestEditor";
  
export const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <Error />
    },
    {
        path: "/repository/:name",
        element: <Repository />,
        errorElement: <Error />,
        children: [
            {
                path: "/repository/:name/application/:app_name",
                element: <ManifestEditor />,
                errorElement: <Error />
            }
        ]
    },
    {
        path: "*",
        element: <Error />
    }
]);