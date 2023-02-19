import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { useContext, useEffect } from "react";
import { GlobalContext, GlobalContextType } from "../../context/GlobalContext";
import { AddGitRepositoryForm } from "../../pages/Home/MainContent/AddGitRepositoryForm";
import { CreateFormsContainer } from "../../pages/Repository/CreateFormsContainer";
import { IssueReporter } from "../../pages/Repository/IssueReporter";
import { NotFound } from "../Error";

export const SideModal = () => {
    const { openSideModal, handleCloseSideModal, sideModalChild } = useContext(GlobalContext) as GlobalContextType;

    const content: any = {
        "create-app-project-container": <CreateFormsContainer />,
        "repo-issue-reporter": <IssueReporter />,
        "create-repo": <AddGitRepositoryForm />,
        "*": <NotFound />
    }

    useEffect(() => {
        console.log(!Object.keys(content).includes(sideModalChild));
    }, [openSideModal])

    return (
        <>
            {openSideModal ?
                <div className={`${openSideModal ? "block" : "hidden"}`}>
                    <div className={`w-full flex flex-row-reverse bg-slate-500 bg-opacity-60 overflow-x-hidden overflow-y-auto fixed inset-0 z-40 outline-none focus:outline-none`}>
                        <div className="w-5/12 bg-slate-100 dark:bg-cyan-700">
                            { !Object.keys(content).includes(sideModalChild) ? content["*"] : content[sideModalChild] }
                        </div>
                        <div className="w-1/12 h-full flex justify-end items-start">
                            <button onClick={handleCloseSideModal} className="h-9 w-9 flex justify-center items-center bg-slate-800 rounded-l-lg hover:bg-white transition ease-linear mt-2">
                                <XMarkIcon className="h-6 text-slate-50 transition ease-linear hover:text-red-600" />
                            </button>
                        </div>
                    </div>
                </div>
                : null}
        </>

    )
}