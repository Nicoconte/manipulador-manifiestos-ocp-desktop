import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { GlobalContext, GlobalContextType } from "../../context/GlobalContext";
import { GitOperation } from "../../data/enums/git.enum";
import { Branches } from "../../data/interfaces/branches.interfaces";
import { GitCommandArgs } from "../../data/interfaces/git.interface";
import { getProjectBranches } from "../../helpers/git.helper";
import { useGitCommand } from "../../hooks/useGitCommands";
import { useGitRepository } from "../../hooks/useGitRepository";


export const Project = () => {
    const { project_name } = useParams();
    
    const { setIsLoading } = useContext(GlobalContext) as GlobalContextType;
    
    const { repository } = useGitRepository();
    const { git } = useGitCommand();

    const [branches, setBranches] = useState<Branches[]>([]);

    const handleBranches = async() => {
        if (!repository || !project_name) {            
            toast.error("No se pudo obtener las aplicaciones de este proyecto");
            return;
        }

        setIsLoading(true);

        let args = { localPath: repository.fullPath } as GitCommandArgs;

        //Local + remote branches
        let allBranches = getProjectBranches((await git(GitOperation.ListAllBranches, args)).branches, project_name);
        
        if (!allBranches.length) {
            setIsLoading(false);
            return;
        }

        //Local only
        let localBranches = (await git(GitOperation.ListLocalBranches, args )).branches;
        
        for(let branch of allBranches) {
            if (!localBranches.includes(branch.name)) {
                await git(GitOperation.CreateBranch, {
                    localPath: repository.fullPath,
                    branch: branch.name,
                    remote: "origin"
                } as GitCommandArgs)
            }
        }

        let lastestLocalBranches = getProjectBranches((await git(GitOperation.ListLocalBranches, args )).branches, project_name);

        setBranches(lastestLocalBranches);

        setIsLoading(false);
    }

    useEffect(() => {
        if (repository) {
            handleBranches();
        }
    }, [repository])

    return (
        <div className="w-full h-full flex flex-col">
            <div className="w-full h-1/6 flex flex-row bg-slate-50 dark:bg-cyan-800 shadow-sm">
                <div className="w-7/12 h-full flex flex-row justify-start items-center">
                    <span className="text-xl font-medium ml-4 dark:text-white">
                        <Link to={`/repository/${repository?.name}`} className="hover:text-slate-400 transition ease-linear">Proyecto</Link> / <span className="text-slate-400 dark:text-slate-300">{project_name} </span>
                    </span>
                    <button className="ml-4 w-8 h-8 rounded-full flex justify-center items-center hover:shadow-lg outline-none focus:outline-none">
                        <Cog6ToothIcon className="h-6 dark:text-white" />
                    </button>
                </div>
                <div className="w-5/12 h-full flex flex-row justify-end items-center"></div>
            </div>
            <div className="w-full h-5/6">
                {branches.length ? 
                    branches.map((b, i) => <span key={i}>{b.name} / {b.fullname} <br/></span>) :
                    <span>No hay aplicaciones</span>
                }
            </div>
        </div>
    )
}