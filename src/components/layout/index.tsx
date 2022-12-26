import React, { useContext, useEffect } from "react";

import { ToastContainer, toast } from 'react-toastify';
import { SettingContext, SettingContextType } from "../../context/SettingContext";
import { LoadingSpinner } from "../LoadingSpinner";
import { SideModal } from "../SideModal";
import { ToggleTheme } from "../ToggleTheme";

type MainLayoutProps = {
    children: JSX.Element | React.ReactNode
}

export const MainLayout = ({ children }: MainLayoutProps) => {
    const { loadGlobalSettings, globalSetting } = useContext(SettingContext) as SettingContextType;

    useEffect(() => {
        if (!globalSetting) {
            loadGlobalSettings();
        }
    }, [globalSetting]);

    return (
        <div className="w-full h-full bg-slate-200 dark:bg-sky-900 transition-colors duration-300">
            {globalSetting &&
                <div className="w-full h-full">
                    {children}
                    <ToggleTheme />
                    <LoadingSpinner />
                    <ToastContainer theme={globalSetting.theme} autoClose={3000} closeOnClick={true} position={toast.POSITION.BOTTOM_LEFT} />
                </div>
            }
        </div>
    )
}