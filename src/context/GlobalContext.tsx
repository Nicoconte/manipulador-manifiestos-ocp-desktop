import React, { useState } from "react";

export type GlobalContextType = {
    isLoading: boolean
    setIsLoading: (value: boolean) => void,
}

const GlobalContext = React.createContext<GlobalContextType | null>(null);

const GlobalProvider: React.FC<React.ReactNode> = ({ children }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    return (
        <GlobalContext.Provider value={{
            isLoading,
            setIsLoading
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export { GlobalContext, GlobalProvider };