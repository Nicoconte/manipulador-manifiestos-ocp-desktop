import { PlusIcon } from "@heroicons/react/24/outline"
import React, { useEffect, useState, useContext } from "react"
import { toast } from "react-toastify"
import { GitRepositoryService } from "../../../../api/services/gitRepository.service"
import { GlobalContext, GlobalContextType } from "../../../../context/GlobalContext"
import { HomeContext, HomeContextType } from "../../../../context/HomeContext"
import { SettingContext, SettingContextType } from "../../../../context/SettingContext"
import { GitOperation } from "../../../../data/enums/git.enum"
import { GitCommandArgs } from "../../../../data/interfaces/git.interface"
import { parseGithubUrl } from "../../../../helpers/git.helper"
import { getPocketbaseErrorMessage } from "../../../../helpers/pocketbase.helper"
import { ToastWrapper } from "../../../../helpers/toast.helper"
import { useGitCommand } from "../../../../hooks/useGitCommands"


export const AddGitRepositoryForm = () => {    
    const { git } = useGitCommand();
    const [githubUrl, setGithubUrl] = useState<string>("");

    const { setIsLoading, handleCloseSideModal } = useContext(GlobalContext) as GlobalContextType;
    const { globalSetting } = useContext(SettingContext) as SettingContextType;

    const { gitRepositories, setGitRepositories, setGitRepositoriesFiltered } = useContext(HomeContext) as HomeContextType;

    const handleSubmit = async () => {
        if (!githubUrl || githubUrl === "") {
            toast.error("Debe introducir la url");
            return;
        }

        if (!githubUrl.includes("github.com") || githubUrl.includes("tree") || githubUrl.includes("blob")) {
            toast.error("Url invalida");
            return;
        }

        const { repositoryName } = parseGithubUrl(githubUrl);

        if (await GitRepositoryService.exists(repositoryName)) {
            toast.error("El repositorio ya existe");
            setGithubUrl("");
            return;
        }

        setIsLoading(true);

        GitRepositoryService.create(githubUrl).then(repo => {
            toast.success("Repositorio guardado");

            git(GitOperation.Clone, {
                localPath: globalSetting!.local_path_to_repositories.concat("/", repo.name),
                githubUrl: githubUrl
            } as GitCommandArgs).then(res => {
                ToastWrapper.git(res);

                let currRepositories = [...gitRepositories];

                currRepositories.unshift(repo);
    
                setGitRepositories(currRepositories);
                setGitRepositoriesFiltered(currRepositories);                
                                
                setIsLoading(false);
                handleCloseSideModal();                
            });
        })
        .catch(err => {
            toast.error(getPocketbaseErrorMessage(err));
        });
    }

    const onInputChange = async(content: string) => {
       setGithubUrl(content);
    }

    return (
        <div className="relative h-60 p-6 flex-auto">
            <div className="w-full h-full flex flex-col items-start justify-center">
                <input type="text"
                    placeholder="Url github. Ej: https://github.com/usted/turepo" 
                    className="w-full h-12 px-3 mt-3 rounded dark:bg-cyan-900 dark:text-white dark:placeholder-slate-100 shadow-md"
                    onChange={(e) => onInputChange(e.target.value)}
                    value={githubUrl}
                />
                <button
                    className="bg-blue-500 hover:bg-blue-700 w-full h-12 flex flex-row justify-center items-center rounded text-white font-bold text-sm shadow hover:shadow-lg outline-none focus:outline-none mt-5"
                    type="button"
                    onClick={handleSubmit}
                >
                    <PlusIcon className="h-7 mr-2" /> Agregar
                </button>          
            </div>
        </div>
    )
}