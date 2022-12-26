import React from "react";
import { RepositoryProvider } from "../../context/RepositoryContext";
import { UpperMenu } from "./UpperMenu";
import { MainContent } from "./MainContent";
import { SideModal } from "../../components/SideModal";

export const Repository = () => {
    return (
        <RepositoryProvider>
            <div className="w-full h-full flex flex-col">
                <UpperMenu />
                <MainContent />
            </div>
            <SideModal />
        </RepositoryProvider>
    )
}