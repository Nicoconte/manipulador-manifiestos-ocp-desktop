import { ArchiveBoxXMarkIcon, ArrowPathIcon, CheckBadgeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import React, { useContext } from "react";
import { RepositoryContext, RepositoryContextType } from "../../../../../context/RepositoryContext";
import { Application } from "../../../../../data/interfaces/application.interface";
import { ClusterLoggingToggle } from "./ClusterLoggingToggle";

import { uid } from "react-uid";

const NoContentTable = () => {
    return (
        <table className="w-full text-md text-left text-gray-500 dark:text-gray-400">
            <tbody>
                <tr className="bg-white border-bdark:bg-cyan-800">
                    <td className="py-4 px-6 w-full flex justify-center items-center">
                        <ArchiveBoxXMarkIcon className="h-6 mr-2" /> Debe seleccionar un proyecto.
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

type ContentTableProps = {
    applications: Application[] | undefined;
}
const ContentTable = ({ applications }: ContentTableProps) => {
    if (applications?.length === 0) {
        return (
            <table className="w-full text-md text-left text-gray-500 dark:text-gray-400">
                <tbody>
                    <tr className="bg-white border-bdark:bg-cyan-800">
                        <td className="py-4 px-6 w-full flex justify-center items-center">
                            <ArchiveBoxXMarkIcon className="h-6 mr-2" /> No encontramos la aplicacion que buscabas.
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }

    return (
        <table className="w-full table-fixed text-md text-left text-gray-500 dark:text-gray-400">
            <thead className="text-md w-full text-slate-50">
                <tr>
                    <th scope="col" className="w-1/12 py-3 px-6 sticky top-0 bg-slate-400 dark:bg-cyan-800">
                        Status
                    </th>                    
                    <th scope="col" className="w-5/12 py-3 px-6 sticky top-0 bg-slate-400 dark:bg-cyan-800">
                        Nombre
                    </th>
                    <th scope="col" className="w-2/12 py-3 px-6 sticky top-0 bg-slate-400 dark:bg-cyan-800 text-center">
                        Logging
                    </th>
                    <th scope="col" className="w-2/12 py-3 px-6 sticky top-0 bg-slate-400 dark:bg-cyan-800">
                        Replicas
                    </th>                    
                    <th scope="col" className="w-3/12 py-3 px-6 sticky top-0 bg-slate-400 dark:bg-cyan-800">
                        <span className="ml-8">Acciones</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                {applications && applications.length !== 0 && applications.map((app, index) =>
                    <tr key={index} className="bg-white border-b dark:border-b-cyan-900 dark:text-slate-50 transition ease-linear hover:bg-slate-100 dark:hover:bg-cyan-700 dark:bg-cyan-900">
                        <td className="py-4 px-6">
                            <CheckBadgeIcon className="h-5" />
                        </td>
                        <td className="py-4 px-6">
                            {app.name}
                        </td>
                        <td className="py-4 px-6">
                            <ClusterLoggingToggle key={uid(app)} app={app} />
                        </td>
                        <td className="py-4 px-6">
                            <input type="number" className="text-center" defaultValue={app.replicas} min="0" max="10" />
                        </td>                        
                        <td className="py-4 px-6 flex justify-start items-center">
                            <button className="text-blue-500 hover:text-blue-700 transition ease-linear w-8 h-8 rounded flex justify-center items-center">
                                <PencilIcon className="h-6" />
                            </button>
                            <button className="text-purple-500 hover:text-purple-700 transition ease-linear ml-3 w-8 h-8 rounded flex justify-center items-center">
                                <ArrowPathIcon className="h-6" />
                            </button>                               
                            <button className="text-red-500 hover:text-red-700 transition ease-linear ml-3 w-8 h-8 rounded flex justify-center items-center">
                                <TrashIcon className="h-6" />
                            </button>                                                        
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export const Table = () => {
    const {
        currentProject,
        projectApplicationsFiltered,
    } = useContext(RepositoryContext) as RepositoryContextType

    return (
        <div className="w-full h-full">
            {!currentProject && <NoContentTable />}
            {currentProject && <ContentTable applications={projectApplicationsFiltered} />}
        </div>
    )
}