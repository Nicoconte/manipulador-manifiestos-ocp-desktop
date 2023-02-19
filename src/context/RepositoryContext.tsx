import React, { useEffect, useState } from "react";
import { GitOperation } from "../data/enums/git.enum";
import { Application } from "../data/interfaces/application.interface";
import { GitCommandArgs, GitStatusReponse } from "../data/interfaces/git.interface";
import { GitRepository } from "../data/interfaces/gitRepository.interface";
import { Project } from "../data/interfaces/project.interface";
import { useGitCommand } from "../hooks/useGitCommands";
import { useGitRepository } from "../hooks/useGitRepository";

export type RepositoryContextType = {
    repository: GitRepository | undefined,
    setRepository: (value: GitRepository) => void,
    currentProject: Project | undefined,
    setCurrentProject: (value: Project | undefined) => void,
    projectApplications: Application[] | undefined,
    setProjectApplications: (value: Application[]) => void,
    hasError: boolean,
    checkRepositoryStatus: () => void,
    errorMessages: GitStatusReponse[],
    projectApplicationsFiltered: Application[] | undefined,
    setProjectApplicationsFiltered: (value: Application[]) => void,
    projects: Project[],
    setProjects: (value: Project[]) => void,
    gitRepositories: GitRepository[],
    setGitRepositories: (value: GitRepository[]) => void,
    gitRepositoriesFiltered: GitRepository[],
    setGitRepositoriesFiltered: (value: GitRepository[]) => void,
}

const RepositoryContext = React.createContext<RepositoryContextType | null>(null);

const RepositoryProvider: React.FC<React.ReactNode> = ({ children }) => {    
    const { repository: localStorageRepo } = useGitRepository();

    const { git } = useGitCommand();

    const [gitRepositories, setGitRepositories] = useState<GitRepository[]>([]);
    const [gitRepositoriesFiltered, setGitRepositoriesFiltered] = useState<GitRepository[]>([]);

    const [repository, setRepository] = useState<GitRepository>();    

    const [projects, setProjects] = useState<Project[]>([]);
    const [projectApplications, setProjectApplications] = useState<Application[]>([]);

    const [currentProject, setCurrentProject] = useState<Project>();
    const [projectApplicationsFiltered, setProjectApplicationsFiltered] = useState<Application[]>([]);
    
    const [hasError, setHasError] = useState<boolean>(false);
    const [errorMessages, setErrorMessages] = useState<GitStatusReponse[]>([]);

    useEffect(() => {
        if (localStorageRepo) {
            setRepository(localStorageRepo);            
        }
    }, [localStorageRepo]);

    const checkRepositoryStatus = async() => {
        if (!repository) return;

        let status = await git(GitOperation.Status, {
            localPath: repository?.fullPath
        } as GitCommandArgs);

        setHasError(!status.success);

        if (!status.success) {
            setErrorMessages(status.status);      
        }
    }

    return (
        <RepositoryContext.Provider value={{
            repository,
            setRepository,
            currentProject,
            setCurrentProject,
            projectApplications,
            setProjectApplications,
            hasError,
            checkRepositoryStatus,
            errorMessages,
            projectApplicationsFiltered,
            setProjectApplicationsFiltered,
            projects,
            setProjects,
            gitRepositories,
            setGitRepositories,
            gitRepositoriesFiltered,
            setGitRepositoriesFiltered
        }}>
            {children}
        </RepositoryContext.Provider>
    )
}

export { RepositoryContext, RepositoryProvider };