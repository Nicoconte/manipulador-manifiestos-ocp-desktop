import React, { useState } from "react";
import { CreateForm as CreateProjectForm } from "../MainContent/Projects/CreateForm";
import { CreateForm as CreateAppForm } from "../MainContent/Applications/CreateForm";

export const CreateFormsContainer = () => {
    const [ activeForm, setActiveForm ] = useState<string>("create-project-form");

    const forms: any = {
        "create-project-form": <CreateProjectForm />,
        "create-app-form": <CreateAppForm />
    }

    return (
        <div className="w-full h-full flex flex-col">
            <div className="w-full flex flex-row text-lg bg-slate-400 dark:bg-cyan-800 text-slate-50" style={{height: "7%"}}>
                <button 
                    onClick={() => setActiveForm("create-project-form")} 
                    className={`${activeForm === "create-project-form" ? "underline" : ""} w-6/12 h-full flex justify-center items-center font-medium transition ease-linear dark:hover:bg-cyan-700 dark:hover:text-slate-200 hover:bg-slate-200 hover:text-slate-600`}
                >
                    Proyecto
                </button>
                <button 
                    onClick={() => setActiveForm("create-app-form")} 
                    className={`${activeForm === "create-app-form" ? "underline" : ""} w-6/12 text- h-full flex justify-center items-center font-medium transition ease-linear dark:hover:bg-cyan-700 dark:hover:text-slate-200 hover:bg-slate-200 hover:text-slate-600`}
                >
                    Aplicacion
                </button>                
            </div>
            <div className="w-full" style={{height: "93%"}}>
                { forms[activeForm] }
            </div>
        </div>
    )

}