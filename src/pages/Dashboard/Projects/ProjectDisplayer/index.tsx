import { ArrowLeftIcon, ArrowRightIcon, TrashIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import { GlobalContext, GlobalContextType } from "../../../../context/GlobalContext";
import { PocketbaseCollections } from "../../../../data/enums/pbCollection.enum";
import { Project } from "../../../../data/interfaces/project.interface";
import { usePocketbasePagination } from "../../../../hooks/usePocketbasePagination";
import { ProjectPagination } from "./ProjectPagination";
import { ProjectTable } from "./ProjectTable";
import { SearchForm } from "./SearchProjectForm";

type ProjectDisplayerProps = {
    repositoryId: string
}

export const ProjectDisplayer = ({ repositoryId }: ProjectDisplayerProps) => {
    const { setIsLoading } = useContext(GlobalContext) as GlobalContextType

    const { goto, next, prev, page, totalPages, items } = usePocketbasePagination<Project>({
        collectionName: PocketbaseCollections.Projects,
        quantityPerPage: 5,
        filter: `repository='${repositoryId}'`,
        setLoading: setIsLoading,
        onError: (err) => {
            toast.error(err);
        }
    });

    const inputContainerStyles = {
        "height": "12%"
    }

    const tableContainerStyles = {
        "height": "72%"
    }

    return (
        <div className="w-full h-full flex justify-center items-center flex-col">
            <div style={inputContainerStyles} className="w-11/12 flex flex-row"> 
                <div className="w-4/6 h-full">
                    <SearchForm />
                </div>               
                <div className="w-2/6 h-full">
                    <ProjectPagination totalPages={totalPages} currentPage={page} next={next} prev={prev} goto={goto} />
                </div>
            </div>
            <div style={tableContainerStyles} className="w-11/12 mb-8 flex justify-center items-center overflow-y-scroll shadow-lg rounded-md">
                <ProjectTable projects={items} />
            </div>
        </div>
    )
}