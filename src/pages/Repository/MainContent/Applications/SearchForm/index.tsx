import React, { useContext, useRef } from "react";
import { RepositoryContext, RepositoryContextType } from "../../../../../context/RepositoryContext";

export const SearchForm = () => {
    const { setProjectApplicationsFiltered, projectApplications, currentProject } = useContext(RepositoryContext) as RepositoryContextType;

    const inputRef = useRef<HTMLInputElement>(null);

    const onInputChange = (value: string) => {
        if (!projectApplications || !currentProject) return;

        if (inputRef.current?.value === "") {
            setProjectApplicationsFiltered(projectApplications);
            return;
       }

        let filtered = projectApplications.filter(p => p.name.toLowerCase().includes(value.toLowerCase()));

        setProjectApplicationsFiltered(filtered);
    }

    return (
        <div className="w-full h-full flex justify-start items-center">
            <input
                ref={inputRef}
                type={"text"} 
                className="px-4 text-sm placeholder:text-slate-400 outline-none focus:outline-none appearance-none rounded-3xl h-10 shadow-md" 
                placeholder="Nombre aplicacion"
                style={{width: "95%"}}
                onChange={(e) => onInputChange(e.target.value)}
            />
        </div>
    )
}