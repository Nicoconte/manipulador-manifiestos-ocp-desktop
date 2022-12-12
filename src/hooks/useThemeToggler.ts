import { useEffect, useState } from "react";
import { SettingService } from "../api/services/setting.service";
import { Setting } from "../data/interfaces/setting.interface";

type useThemeTogglerResponse = {
    loadTheme: () => void,
    toggleTheme: () => void,
    theme: string,
}

export const useThemeToggler = () => {
    const [theme, setTheme] = useState<string>("");
    const [setting, setSetting] = useState<Setting | null>(null);

    useEffect(() => {
        SettingService.get().then(sett => {
            setSetting(sett);
            setTheme(sett.theme);
        })
     }, [])

    const loadTheme = () => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }        
    }

    const toggleTheme = () => {
        let alterTheme = theme === "dark" ? "light" : "dark";

        if (alterTheme === 'dark') {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }

        setTheme(alterTheme);

        SettingService.updateTheme(alterTheme);
    }    

    return {
        loadTheme,
        toggleTheme,
        theme
    } as useThemeTogglerResponse
}