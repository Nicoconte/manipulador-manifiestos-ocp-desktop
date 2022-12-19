import React from "react";
import { useNavigate } from "react-router-dom";
import { Project } from "../../../../data/interfaces/project.interface";

type ProjectTableProps = {
    projects: Project[]
}

export const ProjectTable = ({ projects }: ProjectTableProps) => {
    const navigate = useNavigate();

    return (
        <table className="w-full h-full table-fixed text-md text-left text-gray-500 dark:text-white">
            <thead className="font-medium text-md text-slate-600 dark:text-slate-50 bg-gray-50 dark:bg-cyan-900 ">
                <tr>
                    <td scope="col" className="py-3 px-6">Proyecto</td>
                </tr>
            </thead>
            <tbody>
                {projects && projects.map((i, index) =>
                    <tr onClick={() => navigate("/")} key={index} className="bg-white border-b cursor-pointer transition ease-linear hover:bg-gray-200 dark:hover:bg-cyan-700 dark:bg-cyan-800 dark:border-gray-700">
                        <td className="py-4 px-6">{i.name}</td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}