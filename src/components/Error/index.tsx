import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import React from "react"
import { useNavigate } from "react-router-dom"

export const Error = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <ExclamationCircleIcon className="text-red-600 h-48" />
            <h1 className="text-3xl font-extrabold">
                Nos encontramos con un error inesperado
            </h1>
            <button className="h-16 w-64 mt-10 rounded bg-blue-500 text-white hover:bg-blue-700 transition ease-linear" onClick={() => navigate("/")}>
                Volver a la pagina principal                
            </button>
        </div>
    )
}

export const NotFound = () => {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <ExclamationCircleIcon className="w-20 h-20" />
            <h1 className="text-xl text-slate-600 font-bold mt-5">
                No pudimos encontrar la vista requerida
            </h1>
        </div>
    )
}