import React, { useContext, useEffect, useState } from "react"
import { GitRepository } from "../../../data/interfaces/gitRepository.interface"

import { GlobeAltIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline"
import { ExclamationTriangleIcon, CheckCircleIcon } from "@heroicons/react/24/solid"

import { useNavigate } from "react-router-dom"
import { useGitCommand } from "../../../hooks/useGitCommands"
import { ToastWrapper } from "../../../helpers/toast.helper"
import { GitOperation } from "../../../data/enums/git.enum"
import { GitCommandArgs } from "../../../data/interfaces/git.interface"
import { SettingContext, SettingContextType } from "../../../context/SettingContext"
import { toast } from "react-toastify"
import { useFileSystem } from "../../../hooks/useFileSystem"
import { FileSystemOperation } from "../../../data/enums/fs.enum"
import { FileSystemArgs } from "../../../data/interfaces/fs.interface"
import { GlobalContext, GlobalContextType } from "../../../context/GlobalContext"

type GitRepositoryCardsProps = {
    repository: GitRepository
}

export const GitRepositoryCards = ({ repository }: GitRepositoryCardsProps) => {
    const { setting } = useContext(SettingContext) as SettingContextType;
    const { setIsLoading } = useContext(GlobalContext) as GlobalContextType;

    const [hasLocalRepository, setHasLocalRepository] = useState<boolean>(false);

    const { git } = useGitCommand();
    const { fs } = useFileSystem();

    const navigator = useNavigate();

    useEffect(() => {
        fs(FileSystemOperation.pathExist, {
            path: setting?.local_path_to_repositories.concat("/", repository.name)
        } as FileSystemArgs).then(res => {
            setHasLocalRepository(res.response)
        })
    }, [])

    const navigateToRepository = async() => {
        setIsLoading(true);

        let pathOptions = {
            path: setting?.local_path_to_repositories.concat("/", repository.name)
        } as FileSystemArgs;

        let pathExistResponse = await fs(FileSystemOperation.pathExist, pathOptions);

        if (!pathExistResponse.response) {
            setIsLoading(false);

            toast.warning("Debe clonar este repositorio antes de trabajar con el");
            return;
        }

        setIsLoading(false);

        localStorage.setItem("current_repo", repository.name);
        navigator(`dashboard/${repository.name}`)
    }

    const openGithubUrl = () => {
        window.Main.openBrowser(repository.github_url.replace(".git", ""));
    }

    const handleClone = async () => {
        setIsLoading(true);

        git(GitOperation.Clone, {
            localPath: setting!.local_path_to_repositories.concat("/", repository.name),
            githubUrl: repository.github_url
        } as GitCommandArgs).then(res => {
            ToastWrapper.git(res);

            setIsLoading(false);
   
            if (res.success)
                setHasLocalRepository(true);
        });
    }

    return (
        <div>
            <div className="max-w-sm rounded overflow-hidden shadow-md bg-slate-50 dark:bg-cyan-800">
                <div className="flex flex-col py-1">
                    <div onClick={navigateToRepository} className="w-full hover:cursor-pointer flex justify-start items-center">
                        <h1 className="ml-3 dark:text-white text-lg font-bold" title={repository.name} >{repository.name.length > 28 ? `${repository.name.substring(0, 25)}...` : repository.name}</h1>
                    </div>
                    <div className="w-full flex justify-start flex-row items-center">
                        <h1 className="ml-3 dark:text-white">{repository.organization}</h1>
                    </div>
                </div>
                <div className="w-full flex h-16 px-3">
                    <div className="w-10/12 h-full flex flex-row justify-start items-center">
                        <button onClick={handleClone} className="bg-blue-500 w-9 h-9 flex justify-center items-center rounded hover:shadow-lg outline-none focus:outline-none" type="button">
                            <ArrowDownTrayIcon className="h-6 text-white" title="Clonar repositorio" />
                        </button>
                        <button onClick={openGithubUrl} className="bg-purple-500 ml-3 w-9 h-9 z-10 flex justify-center items-center rounded hover:shadow-lg outline-none focus:outline-none" type="button">
                            <GlobeAltIcon className="h-6 text-white" title="Ver en github" />
                        </button>
                    </div>
                    <div className="w-2/12 flex justify-start items-center">
                        {!hasLocalRepository && <ExclamationTriangleIcon className="h-8 mt-4 cursor-pointer ml-3 text-yellow-600 dark:text-yellow-300" title="Debe clonar este repositorio" />}
                        {hasLocalRepository && <CheckCircleIcon className="h-8 mt-4 cursor-pointer ml-2 text-green-600 dark:text-green-300" title="No se detectaron problemas con este repositorio" />}
                    </div>
                </div>
            </div>
        </div>
    )
}