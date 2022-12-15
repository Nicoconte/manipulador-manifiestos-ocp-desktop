import { HandRaisedIcon, PlusIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { ProjectService } from "../../../../api/services/project.service";
import { GlobalContext, GlobalContextType } from "../../../../context/GlobalContext";
import { Project } from "../../../../data/interfaces/project.interface";
import { getPocketbaseErrorMessage } from "../../../../helpers/pocketbase.helper";

type CreateProjectFormProps = {
    setOpenModal: (value: boolean) => void,
    repositoryId: string | undefined
}

export const CreateProjectForm = ({
    setOpenModal,
    repositoryId
}: CreateProjectFormProps) => {
    const [projectName, setProjectName] = useState<string>("");
    const { setIsLoading } = useContext(GlobalContext) as GlobalContextType;

    const onInputChange = (name: string) => {   
        setProjectName(name);
    }

    const handleSubmit = () => {
        if (!repositoryId) {
            toast.error("Repositorio invalido")
            return;
        }

        if (projectName === "") {
            toast.error("Debe introducir el nombre del proyecto")
            return;
        }
        
        setIsLoading(true);

        ProjectService.createProject(repositoryId, projectName).then((project) => {
            toast.success(`El proyecto ${projectName} fue creado exitosamente!`)
        })
        .catch(err => {
            toast.error(err);
        })
        .finally(() => {
            setIsLoading(false);
            setOpenModal(false);
        })
    }

    return (
        <div className="relative h-60 p-6 flex-auto">
            <div className="w-full h-full flex flex-col items-start justify-center">
                <div className="w-full h-12 flex flex-row justify-center items-center">
                    <input type="text"
                        placeholder="Nombre del proyecto"
                        className="w-11/12 h-full px-3 mt-3 rounded dark:bg-cyan-900 dark:text-white dark:placeholder-slate-100 shadow-md"
                        onChange={(e) => onInputChange(e.target.value)}
                        value={projectName}
                    />
                    <QuestionMarkCircleIcon className="h-10 cursor-pointer transition ease-linear hover:text-cyan-500 text-cyan-600 mt-2 ml-3" title="Un proyecto es un agrupador de aplicaciones." />
                </div>
                <button
                    className="bg-blue-500 hover:bg-blue-700 w-full h-12 flex flex-row justify-center items-center rounded text-white font-bold text-sm shadow hover:shadow-lg outline-none focus:outline-none mt-7"
                    type="button"
                    onClick={handleSubmit}
                >
                    <PlusIcon className="h-7 mr-2" /> Crear
                </button>
            </div>
        </div>
    )
}