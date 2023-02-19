import React, { useEffect, useState } from "react";
import { GitRepository } from "../data/interfaces/gitRepository.interface";

export type HomeContextType = {
    gitRepositories: GitRepository[],
    setGitRepositories: (value: GitRepository[]) => void,
    gitRepositoriesFiltered: GitRepository[],
    setGitRepositoriesFiltered: (value: GitRepository[]) => void,
}

const HomeContext = React.createContext<HomeContextType | null>(null);

const HomeProvider: React.FC<React.ReactNode> = ({ children }) => {    
    const [gitRepositories, setGitRepositories] = useState<GitRepository[]>([]);
    const [gitRepositoriesFiltered, setGitRepositoriesFiltered] = useState<GitRepository[]>([]);


    return (
        <HomeContext.Provider value={{
            gitRepositories,
            setGitRepositories,
            gitRepositoriesFiltered,
            setGitRepositoriesFiltered
        }}>
            {children}
        </HomeContext.Provider>
    )
}

export { HomeContext, HomeProvider };