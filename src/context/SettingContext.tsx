import React, { useEffect, useState } from "react";
import { SettingService } from "../api/services/setting.service";
import { GlobalSetting } from "../data/interfaces/setting.interface";

export type SettingContextType = {
    loadGlobalSettings: () => void,
    globalSetting: GlobalSetting | null
}

const SettingContext = React.createContext<SettingContextType | null>(null);

const SettingProvider: React.FC<React.ReactNode> = ({ children }) => {
    const [setting, setSetting] = React.useState<GlobalSetting | null>(null);

    const loadGlobalSettings = () => {
        SettingService.getGlobalSetting().then(set => {
            setSetting(set);
        })
    }

    return (
        <SettingContext.Provider value={{
            loadGlobalSettings: loadGlobalSettings,
            globalSetting: setting
        }}>
            {children}
        </SettingContext.Provider>
    )
}

export { SettingContext, SettingProvider };