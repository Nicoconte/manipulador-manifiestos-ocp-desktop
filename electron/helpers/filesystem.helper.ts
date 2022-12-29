import fs from "fs";
const yaml = require('js-yaml')

export enum FileSystemOperation {
    PathExist = "pathExist",
    ReadYaml = "readYaml",
    WriteYaml = "writeYaml"
}

export interface FileSystemArgs {
    path: string,
    newPath: string,
    fileContent: any,
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
                message: "El directorio solicitado no existe"
            } as FileSystemResponse
        }

        return {
            success: true,
        } as FileSystemResponse        
    },
    "readYaml": async (args: FileSystemArgs) : Promise<FileSystemResponse> => {
        if (!fs.existsSync(args.path)) {
            return {
                success: false,
                message: "El directorio solicitado no existe"
            } as FileSystemResponse
        }

        let yamlContent = fs.readFileSync(args.path, 'utf8');

        let data = yaml.load(yamlContent);

        return {
            success: true,
            response: data
        } as FileSystemResponse        
    },
    "writeYaml": async (args: FileSystemArgs) : Promise<FileSystemResponse> => {
        if (!fs.existsSync(args.path)) {
            return {
                success: false,
                message: "El directorio solicitado no existe"
            } as FileSystemResponse
        }
        
        fs.writeFileSync(args.path, yaml.dump(args.fileContent.yaml, 'utf8'));

        return {
            success: true
        } as FileSystemResponse  
    }
}