import React from "react";
import { RepositoryProvider } from "../../context/RepositoryContext";
import { Information } from "./Information";
import { MainContent } from "./MainContent";

export const Repository = () => {
    const mainContainerCustomStyles = {
        height: "84%"
    }

    return (
        <RepositoryProvider>
            <div className="w-full h-full flex flex-col">
                <Information />
                <MainContent />
            </div>
        </RepositoryProvider>
    )
}