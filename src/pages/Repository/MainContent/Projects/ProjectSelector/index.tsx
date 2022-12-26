import React, { useContext, useEffect, useState } from "react";
import { ProjectService } from "../../../../../api/services/project.service";
import { GlobalContext, GlobalContextType } from "../../../../../context/GlobalContext";
import { RepositoryContext, RepositoryContextType } from "../../../../../context/RepositoryContext";
import { GitOperation } from "../../../../../data/enums/git.enum";
import { GitCommandArgs } from "../../../../../data/interfaces/git.interface";
import { Project } from "../../../../../data/interfaces/project.interface";
import { normalizeProjectBranches } from "../../../../../helpers/git.helper";
import { useGitCommand } from "../../../../../hooks/useGitCommands";

export const ProjectSelector = () => {
    const { git } = useGitCommand();

    const { setIsLoading } = useContext(GlobalContext) as GlobalContextType;
    const { 
        repository, 
        setCurrentProject, 
        setProjectApplications,
        setProjectApplicationsFiltered
    } = useContext(RepositoryContext) as RepositoryContextType;
    
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        if (!projects.length && repository) {
            ProjectService.getAll(repository!.id).then((res) => {
                setProjects(res);
            })
        }
    }, [repository])

    const handleProjectSelected = async (name: string) => {
        
        if (name === "") {
            setCurrentProject(undefined);
            setProjectApplications([]); 
            return;
        }
        
        let project =  projects.find(p => p.name === name);
        
        if (!project) {
            setProjectApplications([]);
            setProjectApplicationsFiltered([]);   

            return;
        }
        
        setIsLoading(true);
        
        let args = { localPath: repository?.fullPath } as GitCommandArgs;

        let allBranches = normalizeProjectBranches((await git(GitOperation.ListAllBranches, args)).branches, name);

        console.log(allBranches);

        if (!allBranches.length) {
            setIsLoading(false);
            return;
        }

        let localBranches = (await git(GitOperation.ListLocalBranches, args)).branches;        

        for (let branch of allBranches) {
            if (!localBranches.includes(branch.name)) {
                await git(GitOperation.CreateBranch, {
                    localPath: repository?.fullPath,
                    branch: branch.name,
                    remote: "origin"
                } as GitCommandArgs)
            }
        }

        let lastestLocalBranches = normalizeProjectBranches((await git(GitOperation.ListLocalBranches, args)).branches, name);
        
        setProjectApplications(lastestLocalBranches);
        setProjectApplicationsFiltered(lastestLocalBranches);
 
        setCurrentProject(project)

        setIsLoading(false);
    }

    return (
        <div className="w-full h-full flex justify-start items-center">
            <select onChange={(e) => handleProjectSelected(e.target.value)} className="text-slate-400 text-sm rounded-3xl h-9 px-4 w-full outline-none focus:outline-none appearance-none shadow-md">
                <option value={""} selected>Seleccione proyecto</option>
                { projects.length && projects.map((p, i) => (
                  <option className="text-slate-900" key={i} defaultValue={p.name}>{p.name}</option>  
                ))}
            </select>
        </div>
    )
}