import React, { useEffect, useState } from "react";
import { GitOperation } from "../data/enums/git.enum";
import { Application } from "../data/interfaces/application.interface";
import { GitRepository } from "../data/interfaces/gitRepository.interface";
import { Project } from "../data/interfaces/project.interface";
import { useGitCommand } from "../hooks/useGitCommands";
import { useGitRepository } from "../hooks/useGitRepository";

export type RepositoryContextType = {
    repository: GitRepository | undefined,
    setRepository: (value: GitRepository) => void,
    currentProject: Project | undefined,
    setCurrentProject: (value: Project) => void,
    projectApplications: Application[] | undefined,
    setProjectApplications: (value: Application[]) => void
}

const RepositoryContext = React.createContext<RepositoryContextType | null>(null);

const RepositoryProvider: React.FC<React.ReactNode> = ({ children }) => {    
    const { repository: localStorageRepo } = useGitRepository();

    const [repository, setRepository] = useState<GitRepository>();    

    const [currentProject, setCurrentProject] = useState<Project>();
    const [projectApplications, setProjectApplications] = useState<Application[]>();

    useEffect(() => {
        if (localStorageRepo) {
            setRepository(localStorageRepo);            
        }
    }, [localStorageRepo])

    return (
        <RepositoryContext.Provider value={{
            repository,
            setRepository,
            currentProject,
            setCurrentProject,
            projectApplications,
            setProjectApplications
        }}>
            {children}
        </RepositoryContext.Provider>
    )
}

export { RepositoryContext, RepositoryProvider };