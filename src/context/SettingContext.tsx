import React, { useEffect, useState } from "react";
import { SettingService } from "../api/services/setting.service";
import { Setting } from "../data/interfaces/setting.interface";

export type SettingContextType = {
    loadSettings: () => void,
    setting: Setting | null
}

const SettingContext = React.createContext<SettingContextType | null>(null);

const SettingProvider: React.FC<React.ReactNode> = ({ children }) => {
    const [setting, setSetting] = React.useState<Setting | null>(null);

    const loadSettings = () => {
        SettingService.get().then(set => {
            setSetting(set);
        })
    }

    return (
        <SettingContext.Provider value={{
            loadSettings,
            setting
        }}>
            {children}
        </SettingContext.Provider>
    )
}

export { SettingContext, SettingProvider };