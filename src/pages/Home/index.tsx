import React from "react";
import { SideModal } from "../../components/SideModal";
import { HomeMainContent } from "./MainContent";


export const Home = () => {
    return (
        <div className="w-full h-full">
            <HomeMainContent />
            <SideModal />
        </div>
    )
}