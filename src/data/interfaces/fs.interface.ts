export interface FileSystemArgs {
    path: string,
    newPath: string
}

export interface FileSystemResponse {
    success: boolean,
    message: string,
    response: any,
    responses: any[]
}
