import React, { useState } from "react";

export type ProjectContextType = {
    isLoading: boolean
    setIsLoading: (value: boolean) => void,
}

const ProjectContext = React.createContext<ProjectContextType | null>(null);

const ProjectProvider: React.FC<React.ReactNode> = ({ children }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    return (
        <ProjectContext.Provider value={{
            isLoading,
            setIsLoading
        }}>
            {children}
        </ProjectContext.Provider>
    )
}

export { ProjectContext, ProjectProvider };