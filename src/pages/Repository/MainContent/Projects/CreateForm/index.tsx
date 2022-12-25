import React, { useContext } from "react";
import { GlobalContext, GlobalContextType } from "../../../../../context/GlobalContext";

export const CreateForm = () => {
    const { setOpenSideModal } = useContext(GlobalContext) as GlobalContextType;

    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="w-11/12 h-5/6 mt-3 text-center">
                <h1 className="text-2xl">
                    Crear proyecto
                </h1>
                <input className="w-full h-8 text-md mt-5 rounded-md appearance-none focus:appearance-none outline-none focus:outline-none placeholder:text-slate-400 px-4 shadow-md" />
            </div>
            <div className="w-11/12 h-1/6 flex flex-row justify-evenly items-center text-white">
                <button className="w-5/12 h-8 rounded bg-blue-500">
                    Guardar
                </button>
                <button className="w-5/12 h-8 rounded bg-red-500" onClick={() => setOpenSideModal(false)}>
                    Cancelar
                </button>
            </div>
        </div>
    )
}
