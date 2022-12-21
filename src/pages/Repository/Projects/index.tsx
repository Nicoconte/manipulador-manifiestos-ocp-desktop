import React, { useEffect, useState, useContext } from "react";
import { ProjectService } from "../../../api/services/project.service";
import { Project } from "../../../data/interfaces/project.interface";
import { ProjectTable } from "./ProjectTable";
import { SearchProjectForm } from "./SearchProjectForm";

type ProjectDisplayerProps = {
    repositoryId: string,
    projects: Project[],
    setProjects: (value: Project[]) => void,
    projectsFiltered: Project[],
    setProjectsFiltered: (values: Project[]) => void
}

export const ProjectContainer = ({ 
    repositoryId,
    projects,
    setProjects,
    projectsFiltered,
    setProjectsFiltered
}: ProjectDisplayerProps) => {        
    const inputContainerStyles = {
        "height": "12%"
    }

    const tableContainerStyles = {
        "height": "72%"
    }

    return (
        <div className="w-full h-full flex justify-center items-center flex-col">
            <div style={inputContainerStyles} className="w-11/12 flex flex-row"> 
                <div className="w-full h-full">
                    <SearchProjectForm projects={projects} setProjectFiltered={setProjectsFiltered} />
                </div>               
            </div>
            <div style={tableContainerStyles} className="w-11/12 mb-8 flex justify-center items-center overflow-y-scroll shadow-lg rounded-md">
                <ProjectTable projects={projectsFiltered} />
            </div>
        </div>
    )
}