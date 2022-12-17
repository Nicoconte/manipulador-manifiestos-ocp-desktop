import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import React, { useEffect } from "react";


type ProjectPaginationProps = {
    totalPages: number,
    currentPage: number,
    next: () => void,
    prev: () => void,
    goto: (page: number) => void
}

export const ProjectPagination = ({
    totalPages,
    currentPage,
    next,
    prev,
}: ProjectPaginationProps) => {
    
    return (
        <div className="w-full h-full mt-1 flex justify-end items-start px-3">
            <button className="w-8 h-8 bg-blue-500 hover:bg-blue-600 transition ease-linear rounded-l-md flex justify-center items-center text-white" onClick={prev}>
                <ArrowLeftIcon className="w-5 h-5 flex justify-center items-center text-white" />
            </button>

            <span className="w-20 h-8 bg-blue-500 flex justify-center items-center text-md font-medium dark:text-white text-slate-50">{currentPage} / {totalPages}</span>
            
            <button className="w-8 h-8 bg-blue-500 hover:bg-blue-600 transition ease-linear rounded-r-md flex justify-center items-center text-white" onClick={next}>
                <ArrowRightIcon className="w-5 h-5 flex justify-center items-center text-white" />
            </button>
        </div>
    )
}