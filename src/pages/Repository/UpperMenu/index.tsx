import { ArrowLeftIcon, ArrowPathIcon, CheckCircleIcon, Cog8ToothIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { GlobalContext, GlobalContextType } from "../../../context/GlobalContext";
import { RepositoryContext, RepositoryContextType } from "../../../context/RepositoryContext";
import { GitOperation } from "../../../data/enums/git.enum";
import { GitCommandArgs } from "../../../data/interfaces/git.interface";
import { useGitCommand } from "../../../hooks/useGitCommands";


export const UpperMenu = () => {
    const { setIsLoading, handleOpenSideModal } = useContext(GlobalContext) as GlobalContextType;
    const { repository, hasError, checkRepositoryStatus } = useContext(RepositoryContext) as RepositoryContextType;

    const { git } = useGitCommand();

    const openGithubUrl = () => {
        if (repository) {
            window.Main.openBrowser(repository.github_url.replace(".git", ""));
        }
    }

    useEffect(() => {
        if (repository) {
            checkRepositoryStatus();
        }
    }, [repository, hasError])

    return (
        <div className="w-full flex flex-row bg-slate-50 dark:bg-cyan-700 shadow-md" style={{ height: "14%" }}>
            <div className="w-9/12 h-full flex justify-start items-center px-6">
                <Link to={"/"} className="hover:text-slate-400 dark:hover:text-slate-200 transition ease-linear">
                    <ArrowLeftIcon className="h-5 text-slate-700 dark:text-slate-50 mt-1" />
                </Link>
                <span className="text-xl font-medium ml-2">
                    <Link to={"/"} className="hover:text-slate-400 dark:hover:text-slate-200 dark:text-slate-50 transition ease-linear">
                        Repositorio
                    </Link> /
                </span>
                <span title="Ver en github" onClick={openGithubUrl} className="text-xl font-medium text-slate-400 dark:text-slate-200 dark:hover:text-slate-400 ml-1 cursor-pointer hover:text-slate-600 transition ease-linear">{repository?.name}</span>

                <button onClick={() => handleOpenSideModal("repo-issue-reporter")} title={hasError ? "Ver errores" : "No se detectaron errores en este repositorio"} className="w-10 h-10 flex justify-center bg-slate-50 rounded-full items-center ml-4 mt-1 transition ease-linear hover:text-slate-500 dark:bg-cyan-700">
                    {hasError ? <ExclamationCircleIcon className="h-7 text-red-500 hover:text-red-700" /> : <CheckCircleIcon className="h-7 text-green-500 dark:text-green-300 hover:text-green-700" />}
                </button>
                <button title="Configuraciones" className="w-10 h-10 flex ml-1 justify-center bg-slate-50 rounded-full items-center mt-1 transition ease-linear hover:text-slate-500 dark:bg-cyan-700">
                    <Cog8ToothIcon className="h-7 dark:text-slate-50" />
                </button>
            </div>
        </div>
    )
}