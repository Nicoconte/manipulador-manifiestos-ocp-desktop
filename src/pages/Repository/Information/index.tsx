import { Cog8ToothIcon } from "@heroicons/react/24/outline";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { RepositoryContext, RepositoryContextType } from "../../../context/RepositoryContext";

export const Information = () => {
    const { repository } = useContext(RepositoryContext) as RepositoryContextType;

    return (
        <div className="w-full flex flex-row bg-slate-50 shadow-md" style={{height: "14%"}}>
            <div className="w-full h-full flex justify-start items-center px-6">
                <span className="text-xl font-medium">
                    <Link to={"/"} className="hover:text-slate-400 transition ease-linear">Repositorio</Link> / 
                    <span className="text-slate-400 ml-1">{repository?.name}</span>
                </span>
                <button className="w-10 h-10 flex justify-center bg-slate-50 rounded-full items-center ml-3 mt-1 transition ease-linear hover:text-slate-500">
                    <Cog8ToothIcon className="h-7" />
                </button>                
            </div>
        </div>
    )
}