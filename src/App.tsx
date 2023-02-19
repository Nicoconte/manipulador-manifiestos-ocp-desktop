import React from 'react';

import 'react-toastify/dist/ReactToastify.css';

import { RouterProvider } from 'react-router-dom';

import { router } from "./Router";

import { MainLayout } from './components/layout';
import { SettingProvider } from './context/SettingContext';
import { GlobalProvider } from './context/GlobalContext';
import { HomeProvider } from './context/HomeContext';

function App() {
  return (
    <div className="w-full h-screen">
      <GlobalProvider>
        <SettingProvider>
          <HomeProvider>
            <MainLayout>
              <RouterProvider router={router} />
            </MainLayout>
          </HomeProvider>
        </SettingProvider>
      </GlobalProvider>
    </div>
  );
}

export default App;
