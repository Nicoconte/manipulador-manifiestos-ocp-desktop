import { Application } from "../data/interfaces/application.interface";

export const parseGithubUrl = (url: string): {[key: string]: any} => {
    return {
        "repositoryName": url.split("/")[4],
        "repositoryOwner": url.split("/")[3]
    }
}

export const normalizeRepositoryName = (name: string): string => {
    return name.replace(".git", "");
}

export const normalizeProjectBranches = (branches: string[], projectName: string): Application[] => {
    return branches.map(b => b.includes("remotes/origin") ? {
        name: b.replace("remotes/origin/", "")
    } as Application : 
    {
        name: b
    } as Application).filter(c => c.name.toLowerCase().includes(projectName.toLowerCase()));
}

export const normalizeBranches = (branches: string[]): Application[] => {
    return branches.map(b => b.includes("remotes/origin") ? {
        name: b.replace("remotes/origin/", ""),
        origin: b.split("/")[1],
        fullname: b
    } as Application : 
    {
        name: b,
        fullname: b,
        origin: "local"
    } as Application);
}