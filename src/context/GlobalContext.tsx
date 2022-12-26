import React, { useState } from "react";

export type GlobalContextType = {
    isLoading: boolean
    setIsLoading: (value: boolean) => void,
    openSideModal: boolean,
    sideModalChild: string,
    handleOpenSideModal: (childName: string) => void,
    handleCloseSideModal: () => void,
}

const GlobalContext = React.createContext<GlobalContextType | null>(null);

const GlobalProvider: React.FC<React.ReactNode> = ({ children }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [openSideModal, setOpenSideModal] = useState<boolean>(false);
    const [sideModalChild, setSideModalChild] = useState<string>("");

    const handleOpenSideModal = (childName: string) => { 
        setSideModalChild(childName);
        setOpenSideModal(true);
    }

    const handleCloseSideModal = () => {
        setOpenSideModal(false);
    }

    return (
        <GlobalContext.Provider value={{
            isLoading,
            setIsLoading,
            openSideModal,
            sideModalChild,
            handleOpenSideModal,
            handleCloseSideModal
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export { GlobalContext, GlobalProvider };