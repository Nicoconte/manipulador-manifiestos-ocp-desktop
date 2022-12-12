import React, { useContext, useEffect } from "react";

import { ToastContainer, toast } from 'react-toastify';
import { SettingContext, SettingContextType } from "../../context/SettingContext";
import { LoadingSpinner } from "../LoadingSpinner";
import { ToggleTheme } from "../ToggleTheme";

type MainLayoutProps = {
    children: JSX.Element | React.ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => {
    const { loadSettings, setting } = useContext(SettingContext) as SettingContextType;

    useEffect(() => {
        loadSettings();
    }, [setting]);

    return (
        <div className="w-full h-full bg-slate-200 dark:bg-sky-900 transition-colors duration-300">
            {setting &&
                <div className="w-full h-full">
                    {children}
                    <ToggleTheme />
                    <LoadingSpinner />
                    <ToastContainer theme={setting.theme} autoClose={3000} closeOnClick={true} position={toast.POSITION.BOTTOM_LEFT} />
                </div>
            }
        </div>
    )
}