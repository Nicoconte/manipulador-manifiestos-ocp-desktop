import { ArchiveBoxXMarkIcon, CloudArrowDownIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
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
                    <th scope="col" className="w-9/12 py-3 px-6 sticky top-0 bg-slate-400 dark:bg-cyan-800">
                        Nombre
                    </th>
                    <th scope="col" className="w-3/12 py-3 px-6 sticky top-0 bg-slate-400 dark:bg-cyan-800">
                        Acciones
                    </th>
                </tr>
            </thead>
            <tbody>
                {applications && applications.length !== 0 && applications.map((i, index) =>
                    <tr key={index} className="bg-white border-b dark:border-b-cyan-900 dark:text-slate-50 transition ease-linear cursor-pointer hover:bg-slate-300 dark:hover:bg-cyan-700 dark:bg-cyan-900">
                        <td className="py-4 px-6">{i.name}</td>
                        <td className="py-4 px-6 flex justify-start items-center">
                            <button className="bg-blue-500 text-white w-8 h-8 rounded flex justify-center items-center">
                                <PencilIcon className="h-5" />
                            </button>
                            <button className="bg-purple-500 ml-3 text-white w-8 h-8 rounded flex justify-center items-center">
                                <CloudArrowDownIcon className="h-5" />
                            </button>   
                            <button className="bg-red-500 ml-3 text-white w-8 h-8 rounded flex justify-center items-center">
                                <TrashIcon className="h-5" />
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
        projectApplicationsFiltered
    } = useContext(RepositoryContext) as RepositoryContextType

    return (
        <div className="w-full h-full">
            {!currentProject && <NoContentTable />}

            {currentProject && <ContentTable applications={projectApplicationsFiltered} />}
        </div>
    )
}