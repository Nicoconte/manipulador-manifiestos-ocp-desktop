import { CloudArrowUpIcon, DocumentPlusIcon, ServerIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Editor from "@monaco-editor/react";
import React, { useContext, useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { RepositoryContext, RepositoryContextType } from "../../../../../context/RepositoryContext";
import { FileSystemOperation } from "../../../../../data/enums/fs.enum";
import { GitOperation } from "../../../../../data/enums/git.enum";
import { Application } from "../../../../../data/interfaces/application.interface"
import { FileSystemArgs } from "../../../../../data/interfaces/fs.interface";
import { GitCommandArgs } from "../../../../../data/interfaces/git.interface";
import { setValueByKey } from "../../../../../helpers/object.helper";
import { useFileSystem } from "../../../../../hooks/useFileSystem";
import { useGitCommand } from "../../../../../hooks/useGitCommands";
import { useThemeToggler } from "../../../../../hooks/useThemeToggler";

export const ManifestEditor = () => {
    const { fs } = useFileSystem();
    const { git } = useGitCommand();

    const { projectApplicationsFiltered, setProjectApplicationsFiltered, repository } = useContext(RepositoryContext) as RepositoryContextType;

    const [hasChange, setHasChange] = useState<boolean>(false);
    const [app, setApp] = useState<Application>();

    const { app_name } = useParams();
    const navigate = useNavigate();

    const editorRef = useRef<any>();
    const handleEditorMount = (editor: any) => {
        editorRef.current = editor;
    }

    const { theme, loadTheme } = useThemeToggler();

    useEffect(() => {
        loadTheme();
    }, [theme])

    useEffect(() => {
        if (!app) {
            setApp(projectApplicationsFiltered?.find(c => c.name === app_name));

            git(GitOperation.Checkout, {
                localPath: repository?.fullPath,
                branch: app_name
            } as GitCommandArgs);
        }
    }, [app])

    const updateApplicationFromState = () => {
        let index = projectApplicationsFiltered?.findIndex(a => a.name === app?.name);

        if (!app || !projectApplicationsFiltered || !index) return;

        projectApplicationsFiltered[index] = app;

        setProjectApplicationsFiltered(projectApplicationsFiltered!);
    }

    const handleUploadChanges = async () => {
        if (!hasChange) {
            toast.info("No hay cambios");
            return;
        }

        try {
            toast.info("Subiendo cambios");

            app!.manifestContent.env = JSON.parse(editorRef.current?.getValue());

            console.log(JSON.parse(editorRef.current?.getValue()));
            console.log(app?.manifestContent);

            await fs(FileSystemOperation.WriteYaml, {
                path: app?.manifestPath,
                fileContent: {
                    yaml: app?.manifestContent
                }
            } as FileSystemArgs)

            await git(GitOperation.Add, {
                localPath: repository?.fullPath
            } as GitCommandArgs)

            await git(GitOperation.Commit, {
                localPath: repository?.fullPath,
                branch: app?.name,
                message: "Modificando contenido del manifiesto"
            } as GitCommandArgs);

        } catch (err) {
            toast.error(err);
        }

        updateApplicationFromState();
                
        await git(GitOperation.Push, {
            localPath: repository?.fullPath,
            remote: "origin",
            branch: app?.name
        } as GitCommandArgs);

        toast.success("Cambios subidos al repositorio");
    }

    const handleGoBackNavigation = () => {
        if (hasChange && !confirm("Hay cambios que no ha guardado, seguro que sea salir?")) {
            return;
        }

        navigate(-1);
    }

    return (
        <div className="w-full h-full flex flex-col overflow-x-hidden overflow-y-auto fixed inset-0 z-40">
            <div className="w-full flex flex-row bg-slate-100" style={{ height: "10%" }}>
                <div className="w-11/12 h-full flex justify-start items-center px-6">
                    <span className="text-xl font-medium text-slate-600">
                        {app?.name}
                    </span>
                    <button onClick={handleUploadChanges} className="h-9 w-40 bg-blue-500 hover:bg-blue-600 transition ease-linear text-slate-50 rounded flex justify-center items-center ml-7 mt-1">
                        <CloudArrowUpIcon title="Subir cambios" className="h-7 mr-2 text-slate-50" />  Subir cambios
                    </button>
                </div>
                <div className="w-1/12 h-full flex justify-start items-center">
                    <button onClick={handleGoBackNavigation} className="w-10 h-10 flex justify-center items-center">
                        <XMarkIcon className="h-10 text-red-700" />
                    </button>
                </div>
            </div>
            <div className="w-full" style={{ height: "90%" }}>
                <Editor
                    onChange={() => setHasChange(true)}
                    onMount={handleEditorMount}
                    width={"100%"}
                    height={"100vh"}
                    defaultLanguage="json"
                    theme={`${theme === "dark" ? "vs-dark" : "vs-light"}`}
                    defaultValue={JSON.stringify(app?.manifestContent.env, null, 2)}
                />
            </div>
        </div>
    )
}