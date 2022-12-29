export interface FileSystemArgs {
    path: string,
    newPath: string,
    fileContent: any
}

export interface FileSystemResponse {
    success: boolean,
    message: string,
    response: any,
    responses: any[]
}
