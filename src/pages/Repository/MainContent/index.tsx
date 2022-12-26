import React, { useContext } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { SideModal } from "../../../components/SideModal";
import { GlobalContext, GlobalContextType } from "../../../context/GlobalContext";
import { SearchForm } from "./Applications/SearchForm";
import { Table } from "./Applications/Table";
import { ProjectSelector } from "./Projects/ProjectSelector";
import { CreateFormsContainer } from "../CreateFormsContainer";

export const MainContent = () => {
    const { setOpenSideModal } = useContext(GlobalContext) as GlobalContextType;

    const handleOpenSideModal = () => {
        setOpenSideModal(true);
    }

    return (
        <div className="w-full" style={{ "height": "86%" }}>
            <div className="w-full flex justify-center items-center" style={{ height: "14.5%" }}>
                <div className="h-full flex flex-row" style={{ width: "89.5%" }}>
                    <div className="w-5/12 h-full">
                        <SearchForm />
                    </div>
                    <div className="w-3/12 h-full">
                        <ProjectSelector />
                    </div>
                    <div className="w-4/12 h-full flex flex-row justify-end items-center">
                        <button title="Crear proyecto" onClick={handleOpenSideModal} className="h-10 w-24 rounded text-white text-md flex justify-center items-center bg-blue-500">
                            <PlusIcon className="h-6 mr-1" /> Crear
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-center items-center" style={{ height: "85.5%" }}>
                <div className="mb-4 shadow-md rounded-md overflow-y-scroll" style={{ width: "89.5%", height: "95%" }}>
                    <Table />
                </div>
            </div>

            <SideModal>
                <CreateFormsContainer />
            </SideModal>
        </div>
    )
}