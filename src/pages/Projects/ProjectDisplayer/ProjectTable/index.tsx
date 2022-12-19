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
            <table className="w-full text-md text-left text-gray-500 dark:text-gray-400">
                <thead className="text-md text-slate-50">
                    <tr>
                        <th scope="col" className="py-3 px-6 sticky top-0 bg-slate-400 dark:bg-cyan-800">
                            Proyectos
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {projects && projects.map((i, index) =>
                        <tr onClick={() => navigate("/")} key={index} className="bg-white border-b dark:border-b-cyan-900 dark:text-slate-50 transition ease-linear cursor-pointer hover:bg-slate-300 dark:hover:bg-cyan-700 dark:bg-cyan-900">
                            <td className="py-4 px-6">{i.name}</td>
                        </tr>
                    )}
                    {!projects.length &&
                        <tr className="bg-white border-bdark:bg-cyan-800">
                            <td className="py-4 px-6 w-full flex justify-center items-center">
                                <ArchiveBoxXMarkIcon className="h-6 mr-2" /> No encontramos el proyecto que buscabas
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>

    )
}