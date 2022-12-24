import React from "react";
import { SearchForm } from "./Applications/SearchForm";
import { Table } from "./Applications/Table";
import { ProjectSelector } from "./Projects/ProjectSelector";

export const MainContent = () => {
    return (
        <div className="w-full" style={{"height": "86%"}}>
            <div className="w-full flex justify-center items-center" style={{height: "14.5%"}}>
                <div className="h-full flex flex-row" style={{ width:"89.5%"}}>
                    <div className="w-5/12 h-full">
                        <SearchForm />
                    </div>
                    <div className="w-3/12 h-full">
                        <ProjectSelector />
                    </div>   
                    <div className="w-4/12 h-full"></div>             
                </div>
            </div>
            <div className="w-full flex justify-center items-center" style={{height: "85.5%"}}>
                <div className="mb-4 shadow-md rounded-md" style={{ width:"89.5%", height: "95%"}}>
                    <Table />
                </div>
            </div>            
        </div>
    )
}