import React, { useContext, useEffect, useState } from "react";
import { ProjectService } from "../../../../../api/services/project.service";
import { RepositoryContext, RepositoryContextType } from "../../../../../context/RepositoryContext";
import { Project } from "../../../../../data/interfaces/project.interface";

export const ProjectSelector = () => {
    const { repository } = useContext(RepositoryContext) as RepositoryContextType;

    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        if (!projects.length && repository) {
            ProjectService.getAll(repository!.id).then((res) => {
                setProjects(res);
            })
        }
    }, [repository])

    const handleProjectSelected = async (name: string) => {
        console.log(name);
    }

    return (
        <div className="w-full h-full flex justify-start items-center ml-6">
            <select onChange={(e) => handleProjectSelected(e.target.value)} className="text-slate-400 text-sm rounded-3xl h-9 px-3 w-full outline-none focus:outline-none appearance-none shadow-md">
                <option selected>Seleccione un proyecto</option>
                { projects.length && projects.map((p, i) => (
                  <option className="text-slate-900" key={i} defaultValue={p.name}>{p.name}</option>  
                ))}
            </select>
        </div>
    )
}