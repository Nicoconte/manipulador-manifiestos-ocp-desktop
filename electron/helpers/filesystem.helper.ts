import fs from "fs";

export enum FileSystemOperation {
    pathExist = "pathExist",
}

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

export const executeFileSystem: { [key: string]: (args: FileSystemArgs) => Promise<FileSystemResponse> } = {
    "pathExist": async (args: FileSystemArgs) : Promise<FileSystemResponse> => {
        if (!fs.existsSync(args.path)) {
            return {
                success: false,
                response: false,
                message: "El directorio solicitado no existe"
            } as FileSystemResponse
        }

        return {
            success: true,
            response: true,
        } as FileSystemResponse        
    }
}