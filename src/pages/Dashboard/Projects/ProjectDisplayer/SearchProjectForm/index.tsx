import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { toast } from "react-toastify";

type SearchProjectFormProps = {
    setFilter: (value: string) => void,
    repositoryId: string
}

export const SearchProjectForm = ({setFilter, repositoryId}: SearchProjectFormProps) => {
    const [projectName, setProjectName] = useState<string>(""); 

    const onInputChange = (name: string) => {
        if (name === "") {
            resetSearch();
            return;
        }
        setProjectName(name);
    }

    const handleSubmit = () => {
        if (projectName === "") {
            resetSearch();
            return;
        }

        setFilter(`repository='${repositoryId}' && name~'${projectName}'`)        
    }

    const handleSubmitUsingkeyboard = (keyPressed: string) => {
        if (keyPressed === "Enter") {

            if (projectName === "") {
                resetSearch();
                return;
            }

            setFilter(`repository='${repositoryId}' && name~'${projectName}'`)    
        }
    }

    const resetSearch = () => {
        setProjectName("");
        setFilter(`repository='${repositoryId}'`)
    }

    return (
        <div className="w-full h-full flex flex-row">
            <div className="w-5/6 h-full flex justify-start items-start">
                <input onKeyDown={(e) => handleSubmitUsingkeyboard(e.code)} onChange={(e) => onInputChange(e.target.value)} className="w-full h-10 px-4 rounded-2xl dark:bg-cyan-900 dark:text-white dark:placeholder-slate-100 shadow-md" placeholder="Nombre, ej: proyecto-que-me-sacara-de-latam" />
            </div>
            <div className="w-1/6 h-full flex justify-start items-start">
                <button onClick={handleSubmit} className="w-10 h-10 rounded-full ml-3 flex justify-center shadow-md bg-blue-500 items-center">
                    <MagnifyingGlassIcon className="w-4 h-4 text-white" />
                </button>
                <button onClick={resetSearch} className="w-10 h-10 rounded-full ml-3 flex justify-center shadow-md bg-red-700 items-center">
                    <XMarkIcon className="w-4 h-4 text-white" />
                </button>                
            </div>            
        </div>
    )
}