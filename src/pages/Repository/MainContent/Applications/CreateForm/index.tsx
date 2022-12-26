import { MinusIcon } from "@heroicons/react/24/outline";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { GlobalContext, GlobalContextType } from "../../../../../context/GlobalContext";
import { RepositoryContext, RepositoryContextType } from "../../../../../context/RepositoryContext";
import { GitOperation } from "../../../../../data/enums/git.enum";
import { GitCommandArgs } from "../../../../../data/interfaces/git.interface";
import { useGitCommand } from "../../../../../hooks/useGitCommands";

export const CreateForm = () => {
    const { git } = useGitCommand();

    const { repository, setHasError } = useContext(RepositoryContext) as RepositoryContextType;
    const { setOpenSideModal, setIsLoading } = useContext(GlobalContext) as GlobalContextType;

    const [applications, setApplications] = useState<string[]>([]);
    const [applicationName, setApplicationName] = useState<string>("");
    const [applicationSelected, setApplicationSelected] = useState<string>("");

    useEffect(() => {
        if (repository) {
            getApplications();
        }
    }, [repository])

    const handleApplicationSelected = (value: string) => {
        setApplicationSelected(value);
    }

    const getApplications = async () => {
        let apps = (await git(GitOperation.ListLocalBranches, {
            localPath: repository?.fullPath
        } as GitCommandArgs)).branches;

        setApplications(apps);
    }

    const onInputChange = (value: string) => {
        setApplicationName(value);
    }

    const handleCreateApplication = async () => {
        if (applicationName === "") {
            toast.error("Debe introducir el nombre del proyecto");
            return;
        }

        if (applicationName.includes(" ")) {
            toast.error("El nombre no puede contener espacios vacios")
            return;
        }
        
        try {
            setIsLoading(true);
    
            let statusResponse = await git(GitOperation.Status, { localPath:repository?.fullPath} as GitCommandArgs);
    
            if (!statusResponse.success) {
                toast.error("El repositorio tiene problemas. Vuelva al menus y vea con detalle que esta pasando.");
                setHasError(!statusResponse.success);
                setIsLoading(false);
                return;
            }
    
            await git(GitOperation.Checkout, {
                localPath: repository?.fullPath,
                branch: applicationSelected,
            } as GitCommandArgs);
    
                
            await git(GitOperation.CreateBranch, {
                localPath: repository?.fullPath,
                branch: applicationName
            } as GitCommandArgs)

            toast.success(`Aplicacion '${applicationName}' creada`);
    
        } catch(err) {
            toast.error(`Ups...${err}`)
        }

        setIsLoading(false);
        handleClose();        
    }

    const handleClose = () => {
        setOpenSideModal(false);
    }

    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="w-10/12 h-5/6 mt-6 flex items-center flex-col justify-start">
                <h1 className="text-2xl font-bold">
                    Crear aplicacion
                </h1>
                <input
                    value={applicationName}
                    onChange={(e) => onInputChange(e.target.value)}
                    className="w-full h-10 text-md mt-6 rounded-lg appearance-none focus:appearance-none outline-none focus:outline-none placeholder:text-slate-400 px-4 shadow-md"
                    placeholder="Nombre, ej: 'app-test-qa'"
                />
                <select onChange={(e) => handleApplicationSelected(e.target.value)} className="text-slate-400 text-md rounded mt-5 h-10 px-4 w-full outline-none focus:outline-none appearance-none shadow-md">
                    {applications.length && applications.map((a, i) => (
                        <option className="text-slate-900" key={i} defaultValue={a}>
                            Basado en {a}
                        </option>
                    ))}
                </select>

                <span className="mt-7 font-medium">
                    <span className="font-bold">Referencia</span>: <span className="text-slate-500">
                        Representa la rama del repositorio Github en donde se almacen los manifiestos.
                    </span>
                </span>
                <span className="text-slate-500 font-medium text-left mt-4">
                    <MinusIcon className="h-4" /> Ejemplo, la aplicacion "test" hara referencia a la rama "test" de Github, donde se encuentran los manifiestos.
                </span>
                <span className="text-slate-500 font-medium text-left mt-4">
                    <MinusIcon className="h-4" /> Aclaracion, las ramas de github deben tener el mismo nombre que la aplicacion publicada
                </span>
            </div>
            <div className="w-11/12 h-1/6 flex flex-row justify-evenly items-start text-white">
                <button onClick={handleCreateApplication} className="w-5/12 h-8 rounded transition ease-linear bg-blue-500 hover:bg-blue-700">
                    Guardar
                </button>
                <button className="w-5/12 h-8 rounded transition ease-linear bg-slate-500 hover:bg-slate-700" onClick={handleClose}>
                    Cancelar
                </button>
            </div>
        </div>
    )
}