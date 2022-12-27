import { CheckBadgeIcon, ExclamationTriangleIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import React, { useContext, useEffect } from "react";
import { RepositoryContext, RepositoryContextType } from "../../../context/RepositoryContext";
import { GitStatusReponse } from "../../../data/interfaces/git.interface";


type IssueReporterErrorItemsProps = {
    item: GitStatusReponse
}

const IssueReporterErrorItems = ({ item }: IssueReporterErrorItemsProps) => {

     const titles: any = {
        "Conflicto": "Hay conflicto en los archivos mencionados.",
        "Modificado": "Los archivos fueron modificados externamente.\nAñada los archivos y realice un commit",
        "No añadido": "Debe utilizar añadir los archivos modificados."
     }

    return (
        <div className="w-11/12 h-auto mt-5 shadow-md">
            <table className="w-full text-md text-left text-gray-500 dark:text-gray-400">
                <thead className="text-md w-full text-slate-50">
                    <tr>
                        <td scope="col" className="w-full flex flex-row py-3 px-6 sticky top-0 bg-slate-400 dark:bg-cyan-800">
                            <span className="font-medium">{item.status}</span> <QuestionMarkCircleIcon title={titles[item.status]} className="h-6 ml-2 cursor-pointer hover:text-sky-200 transition ease-linear" />
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {item.files.map((f, i) =>
                        <tr key={i} className="bg-white border-bdark:bg-cyan-800">
                            <td className="py-4 px-6 w-full flex justify-start items-center">
                                {f}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table> 
        </div>
    )
}

export const IssueReporter = () => {
    const { hasError, errorMessages } = useContext(RepositoryContext) as RepositoryContextType;

    return (
        <div className="w-full h-full">
            <div className="w-full h-full flex justify-center items-start overflow-y-scroll">
                {!hasError && <h1 className="mt-6 font-medium">No se detectaron problemas en el repositorio</h1>}
                {hasError &&
                    errorMessages.map((i, index) => (
                        <IssueReporterErrorItems key={index} item={i} />
                    ))
                }
            </div>
        </div>
    )
}