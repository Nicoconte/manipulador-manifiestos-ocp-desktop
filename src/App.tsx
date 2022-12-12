import React from 'react';

import 'react-toastify/dist/ReactToastify.css';

import { RouterProvider } from 'react-router-dom';

import { router } from "./Router";

import { MainLayout } from './components/layout';
import { SettingProvider } from './context/SettingContext';
import { GlobalProvider } from './context/GlobalContext';

function App() {
  return (
    <div className="w-full h-screen">
      <GlobalProvider>
        <SettingProvider>
          <MainLayout>
            <RouterProvider router={router} />
          </MainLayout>
        </SettingProvider>
      </GlobalProvider>
    </div>
  );
}

export default App;
