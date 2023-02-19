import { MinusIcon } from "@heroicons/react/24/outline";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { GlobalContext, GlobalContextType } from "../../../../../context/GlobalContext";
import { RepositoryContext, RepositoryContextType } from "../../../../../context/RepositoryContext";
import { FileSystemOperation } from "../../../../../data/enums/fs.enum";
import { GitOperation } from "../../../../../data/enums/git.enum";
import { Application } from "../../../../../data/interfaces/application.interface";
import { FileSystemArgs } from "../../../../../data/interfaces/fs.interface";
import { GitCommandArgs } from "../../../../../data/interfaces/git.interface";
import { getValueByKey } from "../../../../../helpers/object.helper";
import { useFileSystem } from "../../../../../hooks/useFileSystem";
import { useGitCommand } from "../../../../../hooks/useGitCommands";

export const CreateForm = () => {
    const { fs } = useFileSystem();
    const { git } = useGitCommand();

    const { repository, hasError, setProjectApplicationsFiltered, projectApplicationsFiltered } = useContext(RepositoryContext) as RepositoryContextType;
    const { handleCloseSideModal, setIsLoading } = useContext(GlobalContext) as GlobalContextType;

    const [applications, setApplications] = useState<string[]>([]);
    const [applicationName, setApplicationName] = useState<string>("");
    const [applicationSelected, setApplicationSelected] = useState<string>("main");

    useEffect(() => {
        if (repository) {
            getApplications();
        }
    }, [repository])

    const handleApplicationSelected = (value: string) => {
        console.log(value);
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

            if (hasError) {
                toast.error("El repositorio tiene problemas. Vuelva al menus y vea con detalle que esta pasando.");
                setIsLoading(false);
                return;
            }

            console.log("Aplicacion ", applicationName, " basado en ", applicationSelected);

            await git(GitOperation.Checkout, {
                localPath: repository?.fullPath,
                branch: applicationSelected
            } as GitCommandArgs);


            await git(GitOperation.CreateBranch, {
                localPath: repository?.fullPath,
                branch: applicationName
            } as GitCommandArgs);

            await git(GitOperation.Push, {
                localPath: repository?.fullPath,
                remote: "origin",
                branch: applicationName
            } as GitCommandArgs);

            let yaml = await fs(FileSystemOperation.ReadYaml, {
                path: `${repository?.fullPath}/values.yaml`
            } as FileSystemArgs);

            let manifest: any = yaml.response;

            let app = {} as Application;

            app.name = applicationName;
            app.replicas = getValueByKey(manifest, "replicacontroller.replicas");
            app.isLogging = getValueByKey(manifest, "clusterlogging");
            app.manifestPath = `${repository?.fullPath}/values.yaml`;
            app.manifestContent = manifest;
            app.isActive = app.replicas > 0;

            toast.success(`Aplicacion '${applicationName}' creada`);


            projectApplicationsFiltered?.push(app);
            setProjectApplicationsFiltered(projectApplicationsFiltered!);

        } catch (err) {
            toast.error(`Ups...${err}`)
        }

        setIsLoading(false);
        handleCloseSideModal();
    }


    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="w-10/12 h-5/6 mt-6 flex items-center flex-col justify-start">
                <h1 className="text-2xl font-bold dark:text-slate-50">
                    Crear aplicacion
                </h1>
                <input
                    value={applicationName}
                    onChange={(e) => onInputChange(e.target.value)}
                    className="w-full h-10 text-md mt-6 rounded-lg appearance-none focus:appearance-none outline-none focus:outline-none placeholder:text-slate-400 dark:bg-cyan-800 dark:text-white dark:placeholder-slate-100 px-4 shadow-md"
                    placeholder="Nombre, ej: 'app-test-qa'"
                />
                <select defaultValue={"main"} onChange={(e) => handleApplicationSelected(e.target.value)} className="dark:bg-cyan-800 dark:text-white dark:placeholder-slate-100 text-slate-400 text-md rounded mt-5 h-10 px-4 w-full outline-none focus:outline-none appearance-none shadow-md">
                    {applications.length && applications.map((a, i) => (
                        <option className="text-slate-900 dark:text-slate-50" key={i} value={a}>
                            Basado en {a}
                        </option>
                    ))}
                </select>

                <span className="mt-7 font-medium">
                    <span className="font-bold dark:text-slate-50">Referencia:</span>
                    <span className="text-slate-500 dark:text-slate-200 ml-1">
                        Representa la rama del repositorio en donde se almacen los manifiestos.
                    </span>
                </span>
                <span className="text-slate-500 font-medium text-left mt-4">
                    <MinusIcon className="h-4" />
                    <span className="font-bold text-black dark:text-slate-50">Aclaracion:</span>
                    <span className="ml-1 dark:text-slate-200">
                        Las ramas del repositorio deben tener el mismo nombre que la aplicacion publicada.
                        Recomendados la siguiente convencion '{"{proyecto}-{aplicacion}-{entorno}"}', <br />Ejemplo: notificaciones-backend-qa
                    </span>
                </span>
            </div>
            <div className="w-11/12 h-1/6 flex flex-row justify-evenly items-start text-white">
                <button onClick={handleCreateApplication} className="w-5/12 h-8 rounded transition ease-linear bg-blue-500 hover:bg-blue-700">
                    Guardar
                </button>
                <button className="w-5/12 h-8 rounded transition ease-linear bg-slate-500 hover:bg-slate-700" onClick={handleCloseSideModal}>
                    Cancelar
                </button>
            </div>
        </div>
    )
}