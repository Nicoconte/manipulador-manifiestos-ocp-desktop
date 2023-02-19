import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { GlobalContext, GlobalContextType } from "../../../../../../context/GlobalContext";
import { RepositoryContext, RepositoryContextType } from "../../../../../../context/RepositoryContext";
import { FileSystemOperation } from "../../../../../../data/enums/fs.enum";
import { GitOperation } from "../../../../../../data/enums/git.enum";
import { Application } from "../../../../../../data/interfaces/application.interface";
import { FileSystemArgs } from "../../../../../../data/interfaces/fs.interface";
import { GitCommandArgs } from "../../../../../../data/interfaces/git.interface";
import { useFileSystem } from "../../../../../../hooks/useFileSystem";
import { useGitCommand } from "../../../../../../hooks/useGitCommands";

type ClusterLoggingToggleProps = {
    app: Application
}

export const ClusterLoggingToggle = ({ app } : ClusterLoggingToggleProps) => {
    const { git } = useGitCommand();
    const { fs } = useFileSystem();
        
    const { repository, hasError } = useContext(RepositoryContext) as RepositoryContextType;
    const { setIsLoading } = useContext(GlobalContext) as GlobalContextType;

    const [checked, setChecked] = useState<boolean>(app.isLogging)

    const handleToggleClusterLogging = async() => {
        app.isLogging = !app.isLogging; 

        toast.info(`${app.isLogging ? "Habilitando" : "Deshabilitando"} Cluster logging`);
        setIsLoading(true);

        if (hasError) {
            toast.error("Se detectaron problemas con el repositorio. Solucionelos antes de modificar la aplicacion");
            return;
        }

        try {
            app.manifestContent.clusterlogging = app.isLogging;
            
            await git(GitOperation.Checkout, {
                localPath: repository?.fullPath,
                branch: app.name
            } as GitCommandArgs);
    
            await fs(FileSystemOperation.WriteYaml, {
                path: app.manifestPath,
                fileContent: {
                    yaml: app.manifestContent
                }
            } as FileSystemArgs);
    
            await git(GitOperation.Add, {
                localPath: repository?.fullPath
            } as GitCommandArgs)        
    
            await git(GitOperation.Commit, {
                localPath: repository?.fullPath,
                branch: app.name,
                message: `Cluster logging ${app.isLogging ? "habilitado" : "deshabilitado"}`
            } as GitCommandArgs);
    
            await git(GitOperation.Push, {
                localPath: repository?.fullPath,
                remote: "origin",
                branch: app.name
            } as GitCommandArgs);
            setChecked(app.isLogging);

        } catch(err) {
            setChecked(false);
            toast.error(err);
        } finally {
            setIsLoading(false);
        }

    }

    return (
        <div className="w-full h-full flex justify-center items-center">
            <label className="inline-flex relative items-center cursor-pointer">
                <input onChange={handleToggleClusterLogging} type="checkbox" value="" className="sr-only peer" checked={checked} />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
        </div>
    )
}