import React, { useEffect, useState } from "react";
import { GitRepositoryService } from "../../api/services/gitRepository.service";
import { GitRepository } from "../../data/interfaces/gitRepository.interface";

import { ArchiveBoxXMarkIcon, FolderIcon, PlusIcon } from '@heroicons/react/24/outline'
import { GitRepositoryCards } from "./RepositoryCards";
import { FilterGitRepositoriesForm } from "./FilterGitRepositoriesForm";
import { Modal } from "../../components/Modal";
import { AddGitRepositoryForm } from "./AddGitRepositoryForm";

export const Home = () => {
    const [gitRepositories, setGitRepositories] = useState<GitRepository[]>([]);
    const [gitRepositoriesFiltered, setGitRepositoriesFiltered] = useState<GitRepository[]>([]);

    const [isFirstUse, setIsFirstUse] = useState<boolean>(true);
    const [openModal, setOpenModal] = useState<boolean>(false);

    useEffect(() => {
        if (gitRepositories.length === 0) {
            GitRepositoryService.getAll().then(repos => {
                setGitRepositories(repos);
                setGitRepositoriesFiltered(repos);
                setIsFirstUse(repos.length === 0)
            });
        }
    }, [])

    if (gitRepositories.length === 0 && isFirstUse) {
        return (
            <div className="w-full h-full flex flex-col justify-center items-center text-center">
                <FolderIcon className="h-24 dark:text-white" />
                <span className="text-2xl mt-2 font-extrabold dark:text-white">No hay repositorios disponibles</span>
                <span className="mt-5 text-lg font-semibold  text-slate-600 dark:text-slate-200">
                    Aca encontrara todos los repositorios que vaya agregando. <br />
                </span>
                <Modal
                    buttonText={"Agregar repositorio"}
                    open={openModal}
                    setOpen={setOpenModal}
                    icon={<PlusIcon className="h-9 mr-1" />}
                    buttonClassname={"bg-blue-500 hover:bg-blue-700 flex flex-row border-slate-800 justify-center items-center w-56 h-14 rounded text-white font-bold text-md shadow hover:shadow-lg outline-none focus:outline-none mt-5"}
                >
                    <AddGitRepositoryForm
                        setOpenModal={setOpenModal}
                        gitRepositories={gitRepositories}
                        setGitRepositories={setGitRepositoriesFiltered}
                    />
                </Modal>
            </div>
        )
    }

    return (
        <div className="w-full h-full">
            <div className="w-full h-24 flex items-center justify-center">
                <div className="w-full h-full">
                    <FilterGitRepositoriesForm
                        gitRepositories={gitRepositories}
                        setRepositoriesFiltered={setGitRepositoriesFiltered}
                    />
                </div>
            </div>
            <div className="w-full h-5/6 px-4 py-2 overflow-y-scroll overflow-x-hidden">
                {gitRepositoriesFiltered.length === 0 &&
                    <div className="w-full h-full flex flex-col justify-start items-center mt-5">
                        <ArchiveBoxXMarkIcon className="h-40 mt-6 text-red-800 dark:text-red-500" />
                        <span className="text-2xl font-bold text-slate-800 mt-2 dark:text-white">No pudimos encontrar el repositorio que buscas</span>
                    </div>
                }
                <div className="h-full grid grid-cols-3 grid-row gap-6 gap-y-4">
                    {gitRepositoriesFiltered.map((repo, index) => <GitRepositoryCards key={index} repository={repo} />)}
                </div>
            </div>
            <Modal
                open={openModal}
                setOpen={setOpenModal}
                buttonText={""}
                icon={<PlusIcon className="h-6" />}
                buttonClassname={"bg-blue-500 rounded-full fixed w-10 h-10 rounded-full right-2 bottom-16 flex flex-row justify-center items-center text-white font-bold text-md shadow hover:shadow-lg outline-none focus:outline-none"}
            >
                <AddGitRepositoryForm
                    setOpenModal={setOpenModal}
                    gitRepositories={gitRepositories}
                    setGitRepositories={setGitRepositories}
                />
            </Modal>
        </div>
    )
}