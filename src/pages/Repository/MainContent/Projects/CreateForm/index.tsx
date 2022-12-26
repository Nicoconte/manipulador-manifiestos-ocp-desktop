import { MinusIcon } from "@heroicons/react/24/outline";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { ProjectService } from "../../../../../api/services/project.service";
import { GlobalContext, GlobalContextType } from "../../../../../context/GlobalContext";
import { RepositoryContext, RepositoryContextType } from "../../../../../context/RepositoryContext";
import { getPocketbaseErrorMessage } from "../../../../../helpers/pocketbase.helper";

export const CreateForm = () => {
    const { setOpenSideModal } = useContext(GlobalContext) as GlobalContextType;

    const { repository, setProjects, projects } = useContext(RepositoryContext) as RepositoryContextType;

    const [projectName, setProjectName] = useState<string>("");

    const onInputChange = (value: string) => {
        setProjectName(value);
    }

    const handleCreateProject = async() => {

        if (projectName === "") {
            toast.error("Debe introducir el nombre del proyecto");
            return;
        }

        if (projectName.includes(" ")) {
            toast.error("El nombre no puede contener espacios vacios")
            return;
        }

        ProjectService.createProject(repository!.id, projectName)
        .then(projectCreated => {

            let currProjects = [...projects];

            currProjects.unshift(projectCreated);

            setProjects(currProjects);

            toast.success(`Proyecto '${projectName}' creado`)
        })
        .catch(err => {
            toast.error(getPocketbaseErrorMessage(err))
        })
        .finally(() => {
            handleClose();          
        });
    }

    const handleClose = () => {
        setOpenSideModal(false);        
    }

    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="w-10/12 h-5/6 mt-6 flex items-center flex-col justify-start">
                <h1 className="text-2xl font-bold">
                    Crear proyecto
                </h1>
                <input
                    value={projectName}
                    onChange={(e) => onInputChange(e.target.value)}
                    className="w-full h-10 text-md mt-6 rounded-lg appearance-none focus:appearance-none outline-none focus:outline-none placeholder:text-slate-400 px-4 shadow-md"
                    placeholder="Nombre, ej: 'proyecto-test-qa'"
                />
                <span className="mt-7 font-medium">
                    <span className="font-bold">Referencia</span>: <span className="text-slate-500">Un proyecto no es mas que un agrupador de aplicaciones.</span>
                </span>
                <span className="text-slate-500 font-medium text-left mt-4">
                    <MinusIcon className="h-4" /> Ejemplo, el proyecto "test" agrupara todas las aplicaciones que contenga "test" en el nombre
                </span>
            </div>
            <div className="w-11/12 h-1/6 flex flex-row justify-evenly items-start text-white">
                <button onClick={handleCreateProject} className="w-5/12 h-8 rounded transition ease-linear bg-blue-500 hover:bg-blue-700">
                    Guardar
                </button>
                <button className="w-5/12 h-8 rounded transition ease-linear bg-slate-500 hover:bg-slate-700" onClick={handleClose}>
                    Cancelar
                </button>
            </div>
        </div>
    )
}
