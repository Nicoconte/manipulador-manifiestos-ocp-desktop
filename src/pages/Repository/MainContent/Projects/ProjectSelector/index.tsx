import React, { useContext, useEffect, useState } from "react";
import { ProjectService } from "../../../../../api/services/project.service";
import { GlobalContext, GlobalContextType } from "../../../../../context/GlobalContext";
import { RepositoryContext, RepositoryContextType } from "../../../../../context/RepositoryContext";
import { FileSystemOperation } from "../../../../../data/enums/fs.enum";
import { GitOperation } from "../../../../../data/enums/git.enum";
import { Application } from "../../../../../data/interfaces/application.interface";
import { FileSystemArgs } from "../../../../../data/interfaces/fs.interface";
import { GitCommandArgs } from "../../../../../data/interfaces/git.interface";
import { normalizeProjectBranches } from "../../../../../helpers/git.helper";
import { getValueByKey } from "../../../../../helpers/object.helper";
import { useFileSystem } from "../../../../../hooks/useFileSystem";
import { useGitCommand } from "../../../../../hooks/useGitCommands";

export const ProjectSelector = () => {
    const { git } = useGitCommand();
    const { fs } = useFileSystem();

    const { setIsLoading } = useContext(GlobalContext) as GlobalContextType;
    const { 
        repository, 
        currentProject,
        setCurrentProject, 
        setProjectApplications,
        setProjectApplicationsFiltered,
        projects,
        setProjects
    } = useContext(RepositoryContext) as RepositoryContextType;

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

        setCurrentProject(project);        
        
        setIsLoading(true);
        
        let args = { localPath: repository?.fullPath } as GitCommandArgs;

        let allBranches = normalizeProjectBranches((await git(GitOperation.ListAllBranches, args)).branches, name);

        if (!allBranches.length) {
            setIsLoading(false);
            setProjectApplications([]); 
            setProjectApplicationsFiltered([]);               
            return;
        }

        let localBranches = (await git(GitOperation.ListLocalBranches, args)).branches;

        for (let branch of allBranches) {
            if (!localBranches.includes(branch.name)) {
                console.log("Rama ",branch.name);
                await git(GitOperation.CreateBranch, {
                    localPath: repository?.fullPath,
                    branch: branch.name
                } as GitCommandArgs);

                await git(GitOperation.Pull, {
                    localPath: repository?.fullPath,
                    branch: branch.name,
                    remote: "origin"
                } as GitCommandArgs);
            }
        }

        let lastestLocalBranches = normalizeProjectBranches((await git(GitOperation.ListLocalBranches, args)).branches, name);

        for(let branchAsApp of lastestLocalBranches) {
            await git(GitOperation.Checkout, {
                localPath: repository?.fullPath,
                branch: branchAsApp.name
            } as GitCommandArgs);

            let yaml = await fs(FileSystemOperation.ReadYaml, {
                path: `${repository?.fullPath}/values.yaml`
            } as FileSystemArgs);

            let manifest: any = yaml.response;

            branchAsApp.replicas = getValueByKey(manifest, "replicacontroller.replicas");
            branchAsApp.isLogging = getValueByKey(manifest, "clusterlogging");
            branchAsApp.manifestPath = `${repository?.fullPath}/values.yaml`;
            branchAsApp.manifestContent = manifest;
            branchAsApp.isActive = branchAsApp.replicas > 0;
        }
        
        setProjectApplications(lastestLocalBranches);
        setProjectApplicationsFiltered(lastestLocalBranches);

        setIsLoading(false);
    }

    return (
        <div className="w-full h-full flex justify-start items-center">
            <select onChange={(e) => handleProjectSelected(e.target.value)} className ="text-slate-400 text-sm rounded-3xl h-10 px-4 w-full outline-none focus:outline-none appearance-none shadow-md dark:bg-cyan-800 dark:text-white dark:placeholder-slate-100 border">
                <option value={""} selected>Seleccione proyecto</option>
                {projects.length && projects.map((p, i) => (
                  <option className="text-slate-900 dark:text-slate-50" key={i} defaultValue={p.name}>{p.name}</option>  
                ))}
            </select>
        </div>
    )
}