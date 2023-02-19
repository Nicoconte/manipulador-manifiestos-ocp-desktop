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
            <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input
                    ref={inputRef}
                    type={"text"}
                    className="block w-full h-10 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-3xl bg-gray-50 outline-none focus:outline-none appearance-none shadow-md placeholder:text-slate-400 dark:bg-cyan-800 dark:text-white dark:placeholder-slate-100"
                    placeholder="Nombre aplicacion"
                    style={{ width: "95%" }}
                    onChange={(e) => onInputChange(e.target.value)}
                />
            </div>
        </div>
    )
}