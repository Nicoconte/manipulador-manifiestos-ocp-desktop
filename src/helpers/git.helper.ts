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