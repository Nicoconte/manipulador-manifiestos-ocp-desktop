import React, { useRef } from "react";
import { Project } from "../../../../data/interfaces/project.interface";

type SearchProjectFormProps = {
    projects: Project[],
    setProjectFiltered: (projects: Project[]) => void
}

export const SearchProjectForm = ({ projects, setProjectFiltered }: SearchProjectFormProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const onInputChange = (name: string) => {
        if (inputRef.current?.value === "") {
            setProjectFiltered(projects);
            return;
        }

        let result = projects.filter(c => c.name.includes(name));

        setProjectFiltered(result);
    }


    return (
        <div className="w-full h-full flex flex-row">
            <div className="w-3/6 h-full flex justify-start items-start">
                <input onChange={(e) => onInputChange(e.target.value)} className="w-full h-10 px-4 rounded-2xl dark:bg-cyan-900 dark:text-white dark:placeholder-slate-100 shadow-md" placeholder="Nombre, ej: proyecto-que-me-sacara-de-latam" />
            </div>          
        </div>
    )
}