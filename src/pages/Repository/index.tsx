import React from "react";
import { RepositoryProvider } from "../../context/RepositoryContext";
import { UpperMenu } from "./UpperMenu";
import { RepositoryMainContent } from "./MainContent";
import { Outlet } from "react-router-dom";
import { SideModal } from "../../components/SideModal";

export const Repository = () => {
    return (
        <RepositoryProvider>
            <div className="w-full h-full flex flex-col">
                <UpperMenu />
                <RepositoryMainContent />
                <Outlet />
                <SideModal />
            </div>
        </RepositoryProvider>
    )
}