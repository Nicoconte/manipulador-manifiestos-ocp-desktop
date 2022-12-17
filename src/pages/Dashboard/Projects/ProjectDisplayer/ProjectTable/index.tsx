import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Project } from "../../../../../data/interfaces/project.interface";

type ProjectTableProps = {
    projects: Project[]
}

export const ProjectTable = ({ projects }: ProjectTableProps) => {
    return (
        <table className="w-full h-full table-fixed text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="font-medium text-md text-slate-600 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <td scope="col" className="py-3 px-6">Proyecto</td>
                    <td scope="col" className="py-3 px-6">Ultima actualizacion</td>
                    <td scope="col" className="py-3 px-16">Acciones</td>
                </tr>
            </thead>
            <tbody>
                {projects && projects.map((i, index) =>
                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td className="py-4 px-6">{i.name}</td>
                        <td className="py-4 px-6">{i.last_update}</td>
                        <td className=" w-40 h-16 flex justify-center items-center ml-3">
                            <button>
                                <TrashIcon className="h-6 text-red-500" />
                            </button>
                            <button>
                                <PencilIcon className="h-6 ml-5 text-purple-500" />
                            </button>                            
                            <button>
                                <EyeIcon className="h-6 ml-5 text-cyan-500" />
                            </button>                                                        
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}