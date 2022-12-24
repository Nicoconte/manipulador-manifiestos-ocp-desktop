import { ArchiveBoxXMarkIcon } from "@heroicons/react/24/outline";
import React, { useContext } from "react";
import { RepositoryContext, RepositoryContextType } from "../../../../../context/RepositoryContext";
import { Application } from "../../../../../data/interfaces/application.interface";


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
    return (
        <table className="w-full text-md text-left text-gray-500 dark:text-gray-400">
            <thead className="text-md text-slate-50">
                <tr>
                    <th scope="col" className="py-3 px-6 sticky top-0 bg-slate-400 dark:bg-cyan-800">
                        Status
                    </th>
                    <th scope="col" className="py-3 px-6 sticky top-0 bg-slate-400 dark:bg-cyan-800">
                        Nombre
                    </th>
                    <th scope="col" className="py-3 px-6 sticky top-0 bg-slate-400 dark:bg-cyan-800">
                        Errores
                    </th>
                    <th scope="col" className="py-3 px-6 sticky top-0 bg-slate-400 dark:bg-cyan-800">
                        Acciones
                    </th>
                </tr>
            </thead>
            <tbody>
                {applications && applications.length && applications.map((i, index) =>
                    <tr key={index} className="bg-white border-b dark:border-b-cyan-900 dark:text-slate-50 transition ease-linear cursor-pointer hover:bg-slate-300 dark:hover:bg-cyan-700 dark:bg-cyan-900">
                        <td className="py-4 px-6">{i.name}</td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export const Table = () => {
    const { currentProject, projectApplications } = useContext(RepositoryContext) as RepositoryContextType

    return (
        <div className="w-full h-full">
            {!currentProject && !projectApplications?.length ?
                <NoContentTable /> :
                <ContentTable applications={projectApplications} />
            }
        </div>
    )
}