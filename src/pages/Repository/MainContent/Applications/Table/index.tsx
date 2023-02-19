import { ArchiveBoxXMarkIcon, ArrowPathIcon, CheckBadgeIcon, CloudArrowDownIcon, CommandLineIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import React, { useContext } from "react";
import { RepositoryContext, RepositoryContextType } from "../../../../../context/RepositoryContext";
import { Application } from "../../../../../data/interfaces/application.interface";
import { ClusterLoggingToggle } from "./ClusterLoggingToggle";

import { uid } from "react-uid";
import { ReplicaInput } from "./ReplicaInput";
import { Link, useParams } from "react-router-dom";

const NoContentTable = () => {
    return (
        <table className="w-full text-md text-left text-gray-500 dark:text-gray-400">
            <tbody>
                <tr className="bg-white border-b dark:bg-cyan-800 dark:text-slate-50">
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
    const { name } = useParams();

    if (applications?.length === 0) {
        return (
            <table className="w-full text-md text-left text-gray-500 dark:text-gray-400">
                <tbody>
                    <tr className="bg-white border-b dark:bg-cyan-800 dark:text-slate-50">
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
            <thead className="text-md w-full text-slate-50 ">
                <tr>
                    <th scope="col" className="w-1/12 py-3 px-6 sticky top-0 bg-slate-400 dark:bg-cyan-800">
                        Status
                    </th>
                    <th scope="col" className="w-5/12 py-3 px-6 sticky top-0 bg-slate-400 dark:bg-cyan-800">
                        Nombre
                    </th>
                    <th scope="col" className="w-2/12 py-3 px-6 sticky top-0 bg-slate-400 dark:bg-cyan-800 text-center">
                        Logs
                    </th>
                    <th scope="col" className="w-2/12 py-3 px-6 sticky top-0 bg-slate-400 dark:bg-cyan-800">
                        <span className="ml-5">Replicas</span>
                    </th>
                    <th scope="col" className="w-3/12 py-3 px-6 sticky top-0 bg-slate-400 dark:bg-cyan-800">
                        <span className="ml-8">Acciones</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                {applications && applications.length !== 0 && applications.map((app, index) =>
                    <tr key={index} className="bg-white border-b dark:border-b-cyan-900 dark:text-slate-50 transition ease-linear hover:bg-slate-100 dark:hover:bg-cyan-700 dark:bg-cyan-700">
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
                            <ReplicaInput key={uid(app)} app={app} />
                        </td>
                        <td className="py-4 px-6 flex justify-start items-center">
                            <Link key={uid(app)} to={`/repository/${name}/application/${app.name}`} className="text-blue-500 dark:text-blue-300 hover:text-blue-700 transition ease-linear w-8 h-8 rounded flex justify-center items-center ml-6">
                                <CommandLineIcon title="Modificar variables de entorno" className="h-6" />
                            </Link>
                            <button className="text-purple-500 dark:text-purple-300 hover:text-purple-700 transition ease-linear ml-3 w-8 h-8 rounded flex justify-center items-center">
                                <CloudArrowDownIcon title="Sincronizar cambios" className="h-6" />
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