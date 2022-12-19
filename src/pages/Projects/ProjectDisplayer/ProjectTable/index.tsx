import { ArchiveBoxXMarkIcon } from "@heroicons/react/24/outline";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Project } from "../../../../data/interfaces/project.interface";

type ProjectTableProps = {
    projects: Project[]
}

export const ProjectTable = ({ projects }: ProjectTableProps) => {
    const navigate = useNavigate();

    return (
        <div className="w-full h-full">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="py-3 px-6 sticky top-0 bg-gray-50 dark:bg-gray-700">
                            Proyectos
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {projects && projects.map((i, index) =>
                        <tr onClick={() => navigate("/")} key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="py-4 px-6">{i.name}</td>
                        </tr>
                    )}
                    {!projects.length &&
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="py-4 px-6 w-full flex justify-center items-center">
                                <ArchiveBoxXMarkIcon className="h-6 mr-2" /> No se encontramos el proyecto que buscabas
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>

    )
}