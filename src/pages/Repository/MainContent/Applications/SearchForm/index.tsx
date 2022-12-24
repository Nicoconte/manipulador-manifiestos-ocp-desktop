import React from "react";

export const SearchForm = () => {
    return (
        <div className="w-full h-full flex justify-start items-center">
            <input
                type={"text"} 
                className="px-4 text-sm placeholder:text-slate-400 outline-none focus:outline-none appearance-none rounded-3xl h-9 shadow-md" 
                placeholder="Nombre aplicacion"
                style={{width: "95%"}}
            />
        </div>
    )
}