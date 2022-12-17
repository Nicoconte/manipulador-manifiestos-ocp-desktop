import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React from "react";


export const SearchForm = () => {
    return (
        <div className="w-full h-full flex flex-row">
            <div className="w-5/6 h-full flex justify-start items-start">
                <input className="w-full h-10 px-4 rounded-2xl dark:bg-cyan-900 dark:text-white dark:placeholder-slate-100 shadow-md" placeholder="Nombre, ej: proyecto-que-me-sacara-de-latam" />
            </div>
            <div className="w-1/6 h-full flex justify-start items-start">
                <button className="w-10 h-10 rounded-full ml-3 flex justify-center shadow-md bg-blue-500 items-center">
                    <MagnifyingGlassIcon className="w-4 h-4 text-white" />
                </button>
            </div>            
        </div>
    )
}