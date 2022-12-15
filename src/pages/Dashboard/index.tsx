import { ArchiveBoxXMarkIcon, Cog6ToothIcon, FolderIcon, PlusIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProjectService } from "../../api/services/project.service";
import { Modal } from "../../components/Modal";
import { Project } from "../../data/interfaces/project.interface";
import { useGitRepository } from "../../hooks/useGitRepository";
import { CreateProjectForm } from "./Projects/CreateProjectForm";

export const Dashboard = () => {
    const { repository } = useGitRepository();
    const [projects, setProjects] = useState<Project[]>([]);
    const [openModal, setOpenModal] = useState<boolean>(false);

    useEffect(() => {
        if (repository) {
            ProjectService.getFirstFiveProjectsFromRepository(repository.id).then(proj => {
                setProjects(proj);
            })
        }

        console.log(projects);
    }, [repository])

    return (
        <div className="w-full h-full flex flex-col">
            <div className="w-full h-1/6 flex flex-row bg-slate-50 dark:bg-cyan-800 shadow-lg">
                <div className="w-7/12 h-full flex flex-row justify-start items-center">
                    <span className="text-xl font-medium ml-4 dark:text-white">
                        <Link to="/" className="hover:text-slate-400 transition ease-linear">Repositorios</Link> / <span className="text-slate-400 dark:text-slate-300">{repository?.name} </span>
                    </span>
                    <button className="ml-4 w-8 h-8 rounded-full flex justify-center items-center hover:shadow-lg outline-none focus:outline-none">
                        <Cog6ToothIcon className="h-6 dark:text-white" />
                    </button>
                </div>
                <div className="w-5/12 h-full flex flex-row justify-end items-center">
                    <Modal 
                        setOpen={setOpenModal} 
                        open={openModal} 
                        buttonText="Agrega proyecto"
                        buttonClassname="ml-4 w-44 h-11 mr-6 text-white shadow-md bg-blue-500 rounded flex justify-center items-center hover:shadow-lg outline-none focus:outline-none"
                        icon={<PlusIcon className="h-5 mr-1" />}                      
                    >
                        <CreateProjectForm
                            setOpenModal={setOpenModal}
                            repositoryId={repository?.id}
                        />                        
                    </Modal>
                </div>
            </div>
            <div className="w-full h-5/6">
                {projects.length === 0 &&
                    <div className="w-full h-full flex flex-col justify-center items-center">
                        <ArchiveBoxXMarkIcon className="h-24 mb-3 text-red-800 dark:text-red-500" />
                        <span className="font-bold text-2xl mb-36 text-slate-800 dark:text-slate-50">No hay repositorios asignado a este repositorio</span>
                   </div>
                }
            </div>
        </div>
    )
}