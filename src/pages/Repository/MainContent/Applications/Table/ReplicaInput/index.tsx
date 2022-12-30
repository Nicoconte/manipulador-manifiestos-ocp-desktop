import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import React, { useContext, useState } from "react";
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

import moment from "moment";
import { setValueByKey } from "../../../../../../helpers/object.helper";

type ReplicaInputProps = {
    app: Application
}

export const ReplicaInput = ({ app }: ReplicaInputProps) => {
    const [replicas, setReplicas] = useState<number>(app.replicas);

    enum InputActions {
        Increment,
        Decrement
    }

    const { fs } = useFileSystem();
    const { git } = useGitCommand();

    const { setIsLoading } = useContext(GlobalContext) as GlobalContextType;
    const { hasError, repository } = useContext(RepositoryContext) as RepositoryContextType;

    const handleReplicaChanges = async (action: InputActions) => {
        if (action === InputActions.Increment) {
            app.replicas = app.replicas + 1 > 10 ? 10 : app.replicas + 1;
            setReplicas(app.replicas);
        }

        if (action === InputActions.Decrement) {
            app.replicas = app.replicas - 1 < 0 ? 0 : app.replicas - 1;
            setReplicas(app.replicas);  
        }

        toast.info("Modificando cantidad de replicas");
        
        setIsLoading(true);

        if (hasError) {
            toast.error("Se detectaron problemas con el repositorio. Solucionelos antes de modificar la aplicacion");
            return;
        }

        try {
            await git(GitOperation.Checkout, {
                localPath: repository?.fullPath,
                branch: app.name
            } as GitCommandArgs);

            setValueByKey(app.manifestContent, "replicacontroller.replicas", app.replicas);

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
                message: app.replicas === 0 ? `Pod apagado: ${moment().format()}`  : `${action == InputActions.Decrement ? "Disminuyo" : "Aumento"} cantidad de replicas`
            } as GitCommandArgs);

            await git(GitOperation.Push, {
                localPath: repository?.fullPath,
                remote: "origin",
                branch: app.name
            } as GitCommandArgs);

        } catch (err) {
            toast.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="w-full h-10 bg-slate-300 rounded">
            <div className="w-full h-full flex flex-row justify-center items-center">
                <button onClick={() => handleReplicaChanges(InputActions.Decrement)} className="w-4/12 h-full flex justify-center items-center transition ease-linear hover:bg-slate-200">
                    <MinusIcon className="h-5" />
                </button>
                <div className="w-4/12 h-full flex justify-center items-center">
                    <span className="text-md font-medium">
                        {replicas}
                    </span>
                </div>
                <button onClick={() => handleReplicaChanges(InputActions.Increment)} className="w-4/12 h-full flex justify-center items-center transition ease-linear hover:bg-slate-200">
                    <PlusIcon className="h-5" />
                </button>
            </div>
        </div>
    )
}
