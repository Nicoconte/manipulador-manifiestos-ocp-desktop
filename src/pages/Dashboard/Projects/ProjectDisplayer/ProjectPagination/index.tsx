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
    goto
}: ProjectPaginationProps) => {
    
    useEffect(() => {
        console.log(Array.from(Array.of(totalPages).keys()).slice(currentPage));
    }, [])

    return (
        <div className="w-full h-full mt-1 rounded-lg flex space-x-3 justify-end items-start px-3">
            <button className="w-8 h-8 bg-blue-500 rounded-lg flex justify-center items-center text-white" onClick={prev}>
                <ArrowLeftIcon className="w-5 h-5 flex justify-center items-center text-white" />
            </button>

            <span className="w-8 h-8 flex justify-center items-center text-slate-500">{currentPage}</span>
            
            <button className="w-8 h-8 bg-blue-500 rounded-lg flex justify-center items-center text-white" onClick={next}>
                <ArrowRightIcon className="w-5 h-5 flex justify-center items-center text-white" />
            </button>
        </div>
    )
}