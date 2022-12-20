import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useGitRepository } from "../../hooks/useGitRepository";


export const Applications = () => {
    const { repository } = useGitRepository();
    const { project_name } = useParams();

    useEffect(() => { }, [repository])

    return (
        <div className="w-full h-full flex flex-col">
            <div className="w-full h-1/6 flex flex-row bg-slate-50 dark:bg-cyan-800 shadow-sm">
                <div className="w-7/12 h-full flex flex-row justify-start items-center">
                    <span className="text-xl font-medium ml-4 dark:text-white">
                        <Link to={`/repository/${repository?.name}`} className="hover:text-slate-400 transition ease-linear">Proyecto</Link> / <span className="text-slate-400 dark:text-slate-300">{project_name} </span>
                    </span>
                    <button className="ml-4 w-8 h-8 rounded-full flex justify-center items-center hover:shadow-lg outline-none focus:outline-none">
                        <Cog6ToothIcon className="h-6 dark:text-white" />
                    </button>
                </div>
                <div className="w-5/12 h-full flex flex-row justify-end items-center">

                </div>
            </div>
            <div className="w-full h-5/6">
                <h1>{project_name}</h1>
            </div>
        </div>
    )
}