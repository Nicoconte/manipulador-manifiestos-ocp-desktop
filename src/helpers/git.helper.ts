import { Branches } from "../data/interfaces/branches.interfaces";

export const parseGithubUrl = (url: string): {[key: string]: any} => {
    return {
        "repositoryName": url.split("/")[4],
        "repositoryOwner": url.split("/")[3]
    }
}

export const normalizeBranchesName = (branches: string[]): string[] => {
    return branches.map(b => b.includes("remotes/origin") ? b.replace("remotes/origin/", "") : b);
}

export const normalizeRepositoryName = (name: string): string => {
    return name.replace(".git", "");
}

export const getProjectBranches = (branches: string[], projectName: string): Branches[] => {
    return branches.map(b => b.includes("remotes/origin") ? {
        name: b.replace("remotes/origin/", ""),
        origin: b.split("/")[1],
        fullname: b
    } as Branches : 
    {
        name: b,
        fullname: b,
        origin: "local"
    } as Branches).filter(c => c.name.toLowerCase().includes(projectName.toLowerCase()));
}