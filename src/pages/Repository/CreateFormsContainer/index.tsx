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
            <div className="w-full flex flex-row text-lg bg-slate-400 text-slate-50" style={{height: "7%"}}>
                <button onClick={() => setActiveForm("create-project-form")} className="w-6/12 h-full flex justify-center items-center font-medium transition ease-linear hover:bg-slate-200 hover:text-slate-600">
                    Proyecto
                </button>
                <button onClick={() => setActiveForm("create-app-form")} className="w-6/12 h-full flex justify-center items-center font-medium transition ease-linear hover:bg-slate-200 hover:text-slate-600">
                    Aplicacion
                </button>                
            </div>
            <div className="w-full" style={{height: "93%"}}>
                { forms[activeForm] }
            </div>
        </div>
    )

}