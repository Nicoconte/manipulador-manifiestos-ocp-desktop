import { CheckCircleIcon, Cog8ToothIcon, ExclamationCircleIcon, GlobeAltIcon } from "@heroicons/react/24/outline";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { RepositoryContext, RepositoryContextType } from "../../../context/RepositoryContext";
import { GitOperation } from "../../../data/enums/git.enum";
import { GitCommandArgs } from "../../../data/interfaces/git.interface";
import { useGitCommand } from "../../../hooks/useGitCommands";

export const Information = () => {
    const { repository, hasError, setHasError } = useContext(RepositoryContext) as RepositoryContextType;

    const { git } = useGitCommand();

    const checkStatus = async () => {
        let status = await git(GitOperation.Status, {
            localPath: repository?.fullPath
        } as GitCommandArgs);

        setHasError(!status.success);
    }

    const openGithubUrl = () => {
        if (repository) {
            window.Main.openBrowser(repository.github_url.replace(".git", ""));
        }
    }

    useEffect(() => {
        if (repository) {
            checkStatus();
        }
    }, [repository])

    return (
        <div className="w-full flex flex-row bg-slate-50 shadow-md" style={{ height: "14%" }}>
            <div className="w-full h-full flex justify-start items-center px-6">
                <span className="text-xl font-medium">
                    <Link to={"/"} className="hover:text-slate-400 transition ease-linear">Repositorio</Link> /
                    <span title="Ver en github" onClick={openGithubUrl} className="text-slate-400 ml-1 cursor-pointer hover:text-slate-600 transition ease-linear">{repository?.name}</span>
                </span>
                <button title={hasError ? "Ver errores" : "No se detectaron errores en este repositorio"} className="w-10 h-10 flex justify-center bg-slate-50 rounded-full items-center ml-3 mt-1 transition ease-linear hover:text-slate-500">
                    {hasError ? <ExclamationCircleIcon className="h-7 text-red-500 hover:text-red-700" /> : <CheckCircleIcon className="h-7 text-sky-500 hover:text-sky-700" />}
                </button>
                <button title="Configuraciones" className="w-10 h-10 flex mr-3 justify-center bg-slate-50 rounded-full items-center mt-1 transition ease-linear hover:text-slate-500">
                    <Cog8ToothIcon className="h-7" />
                </button>
            </div>
        </div>
    )
}