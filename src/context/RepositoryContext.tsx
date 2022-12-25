import React, { useEffect, useState } from "react";
import { GitOperation } from "../data/enums/git.enum";
import { Application } from "../data/interfaces/application.interface";
import { GitRepository } from "../data/interfaces/gitRepository.interface";
import { Project } from "../data/interfaces/project.interface";
import { useGitRepository } from "../hooks/useGitRepository";

export type RepositoryContextType = {
    repository: GitRepository | undefined,
    setRepository: (value: GitRepository) => void,
    currentProject: Project | undefined,
    setCurrentProject: (value: Project | undefined) => void,
    projectApplications: Application[] | undefined,
    setProjectApplications: (value: Application[]) => void,
    hasError: boolean,
    setHasError: (value: boolean) => void,
    projectApplicationsFiltered: Application[] | undefined,
    setProjectApplicationsFiltered: (value: Application[]) => void,
}

const RepositoryContext = React.createContext<RepositoryContextType | null>(null);

const RepositoryProvider: React.FC<React.ReactNode> = ({ children }) => {    
    const { repository: localStorageRepo } = useGitRepository();

    const [repository, setRepository] = useState<GitRepository>();    

    const [ hasError, setHasError ] = useState<boolean>(false);

    const [currentProject, setCurrentProject] = useState<Project>();

    const [projectApplicationsFiltered, setProjectApplicationsFiltered] = useState<Application[]>([]);
    const [projectApplications, setProjectApplications] = useState<Application[]>([]);

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
            setProjectApplications,
            hasError,
            setHasError,
            projectApplicationsFiltered,
            setProjectApplicationsFiltered
        }}>
            {children}
        </RepositoryContext.Provider>
    )
}

export { RepositoryContext, RepositoryProvider };