import React, { useEffect, useRef, useState } from "react"

import { GitRepository } from "../../../data/interfaces/gitRepository.interface"

type FilterGitRepositoriesFormProps = {
    gitRepositories: GitRepository[],
    setRepositoriesFiltered: (values: GitRepository[]) => void
}


const FilterFunctions: { [key: string]: (filterValue: string, repositories: GitRepository[]) => GitRepository[] } = {
    "org": (filterValue: string, repositories: GitRepository[]): GitRepository[] => {
        return repositories.filter(r => r.organization.toLowerCase().includes(filterValue.toLowerCase()));
    },
    "repo": (filterValue: string, repositories: GitRepository[]): GitRepository[] => {
        return repositories.filter(r => r.name.toLowerCase().includes(filterValue.toLowerCase()));
    }
}

export const FilterGitRepositoriesForm = ({ 
    gitRepositories, 
    setRepositoriesFiltered
}: FilterGitRepositoriesFormProps) => {
    const [title, setTitle] = useState<string>(""); 
    const [hasError, setHasError] = useState<boolean>(false);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => { }, [])

    const onFilter = (value: string) => {
        value = value.replaceAll(" ", "");

        if (inputRef.current?.value === "") {
            setTitle("");
            setHasError(false);
            setRepositoriesFiltered(gitRepositories);
            return;
       }

        if (!value.includes(":")) {
            setHasError(true);
            setTitle("Filtro incorrecto")
            return;
        }

        const [filterType, name] = value.split(":");

        if (!Object.keys(FilterFunctions).includes(filterType)) {
            setHasError(true);
            setTitle("Tipo de filtro incorrecto")
            return;
        }

        const result = FilterFunctions[filterType](name, gitRepositories);
        setRepositoriesFiltered(result);
        
        setTitle("");
        setHasError(false);
    }

    return (
        <div className="w-full h-full flex justify-center items-center">
            <input 
                ref={inputRef}
                onChange={(e) => onFilter(e.target.value)} 
                className={`w-11/12 h-3/6 px-4 rounded-3xl appearance-none border-2 ${hasError ? "border-red-500" : "border-transparent"} outline-none focus:outline-none dark:bg-cyan-800 dark:text-white dark:placeholder-slate-100 shadow-md`}
                placeholder="Filtros, ej: repo:turepositorio, org:tuorganizacion"
                title={title}
            />
        </div>
    )
}