import React, { useEffect } from "react"
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline"
import { useThemeToggler } from "../../hooks/useThemeToggler";

export const ToggleTheme = () => {
    const { theme, toggleTheme, loadTheme } = useThemeToggler();

    useEffect(() => {
        loadTheme();
    }, [theme])
    

    return (
        <div className="fixed w-11 h-11 rounded-full right-2 bottom-2">
            <button onClick={toggleTheme} className={`w-full h-full flex justify-center items-center rounded-full ${theme === "light" ? "bg-cyan-900" : "bg-orange-400"}`}>
                {theme === "light" && <MoonIcon className="h-6 text-white" />}
                {theme === "dark" && <SunIcon className="h-6 text-white" />}
            </button>
        </div>
    )
}