export interface GitCommandArgs {
    localPath: string,
    githubUrl: string,
    message: string,
    remote: string,
    branch: string 
}

export interface GitCommandResponse {
    success: boolean,
    message: string,
    branches: string[],
}