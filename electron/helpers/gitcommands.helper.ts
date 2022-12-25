import { simpleGit } from "simple-git";

import fs from "fs";

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
    status: string[]
}

export enum GitOperation {
    Clone = "clone",
    Fetch = "fetch",
    ListLocalBranches = "list-local-branches",
    ListAllBranches = "list-all-branches",
    CreateBranch = "create-branch",
    Add = "add",
    Commit = "commit",
    Checkout = "checkout",
    Pull = "pull",
    Push = "push",
    Status = "status",
}

export const executeGitCommand: { [key: string]: (args: GitCommandArgs) => Promise<GitCommandResponse> } = {
    "clone": async (args: GitCommandArgs) : Promise<GitCommandResponse> => {
        if (fs.existsSync(args.localPath)) {
            return {
                success: false,
                message: "El repositorio ya habia sido clonado con anterioridad"
            } as GitCommandResponse
        }
        
        await simpleGit().clone(args.githubUrl, args.localPath);

        return {
            success: true,
            message: `Repositorio clonado en la ruta ${args.localPath}`
        } as GitCommandResponse        
    },
    "fetch": async (args: GitCommandArgs) : Promise<GitCommandResponse> => {
        if (!fs.existsSync(args.localPath)) {
            return {
                success: false,
                message: "No se pudo descargar el contenido de la rama remota: El repositorio local no existe"
            } as GitCommandResponse
        }        
        
        await simpleGit(args.localPath).fetch(args.remote)    
        
        return {
            success: true,
            message: "Contenido remoto descargado"
        } as GitCommandResponse        
    },
    "list-all-branches": async (args: GitCommandArgs) : Promise<GitCommandResponse> => {
        if (!fs.existsSync(args.localPath)) {
            return {
                success: false,
                message: "No se pudo obtener las ramas: El repositorio local no existe"
            } as GitCommandResponse
        }                

        let branches = await simpleGit(args.localPath).branch();
        
        return {
            success: true,
            branches: branches.all
        } as GitCommandResponse;
    },
    "create-branch": async (args: GitCommandArgs) : Promise<GitCommandResponse> => {
        if (!fs.existsSync(args.localPath)) {
            return {
                success: false,
                message: "No se pudo crear la rama nueva: El repositorio local no existe"
            } as GitCommandResponse
        }        

        await simpleGit(args.localPath).checkoutLocalBranch(args.branch);

        return {
            success: true,
            message: `Rama ${args.branch} creada`
        } as GitCommandResponse
    },
    "list-local-branches": async (args: GitCommandArgs) : Promise<GitCommandResponse> => {
        if (!fs.existsSync(args.localPath)) {
            return {
                success: false,
                message: "No se pudo crear la rama nueva: El repositorio local no existe"
            } as GitCommandResponse
        }        

        let response = await simpleGit(args.localPath).branchLocal();

        return {
            success: true,
            branches: response.all
        } as GitCommandResponse
    },
    "add": async (args: GitCommandArgs) : Promise<GitCommandResponse> => {
        if (!fs.existsSync(args.localPath)) {
            return {
                success: false,
                message: "No se pudo añadir archivos: El repositorio local no existe"
            } as GitCommandResponse
        }        

        await simpleGit(args.localPath).add("*");
        return {
            success: true,
            message: "Archivos añadidos"
        } as GitCommandResponse
    },
    "commit": async (args: GitCommandArgs) : Promise<GitCommandResponse> => {
        if (!fs.existsSync(args.localPath)) {
            return {
                success: false,
                message: "No se pudo guardar los cambios: El repositorio local no existe"
            } as GitCommandResponse
        }        

        await simpleGit(args.localPath).commit(args.message);

        return {
            success: true,
            message: "Cambios guardados"
        } as GitCommandResponse        
    },
    "checkout": async(args: GitCommandArgs) : Promise<GitCommandResponse> => {
        if (!fs.existsSync(args.localPath)) {
            return {
                success: false,
                message: "No se pudo cambiar de rama: El repositorio local no existe"
            } as GitCommandResponse
        }        

        await simpleGit(args.localPath).checkout(args.branch);
        return {
            success: true,
            message: `Rama actual ${args.branch}`
        } as GitCommandResponse        
    },
    "pull": async (args: GitCommandArgs) : Promise<any> => {
        if (!fs.existsSync(args.localPath)) {
            return {
                success: false,
                message: `No se pudo obtener los cambios de la rama ${args.branch}. El repositorio local no existe` 
            } as GitCommandResponse
        }        

        await simpleGit(args.localPath).pull(args.remote, args.branch);

        return {
            success: true,
            message: `Cambios de la rama ${args.branch} descargados`
        } as GitCommandResponse        
    },
    "push": async (args: GitCommandArgs) : Promise<any> => {
        if (!fs.existsSync(args.localPath)) {
            return {
                success: false,
                message: "No se pudo enviar los cambios. El repositorio local no existe"
            } as GitCommandResponse
        }         
        await simpleGit(args.localPath).push(args.remote, args.branch);
        return {
            success: true,
            message: `Cambios enviados a la rama ${args.branch}`
        } as GitCommandResponse        
    },
    "status": async (args: GitCommandArgs) : Promise<any> => {
        if (!fs.existsSync(args.localPath)) {
            return {
                success: false,
                message: "No se pudo enviar los cambios. El repositorio local no existe"
            } as GitCommandResponse
        }         

        let status = await simpleGit(args.localPath).status();

        if (status.isClean()) {
            return {
                success: true,
                message: `No hay cambios en su repositorio`
            } as GitCommandResponse             
        }

        let statusReturned = [];

        if (status.conflicted.length > 0) {
            statusReturned.push(`Hay conflicto en los siguientes archivos: ${status.conflicted.join("\n")}`)
        }

        if (status.modified.length > 0) {
            statusReturned.push(`Hay cambios no guardados en los archivos: ${status.not_added.join("\n")}`)
        }

        return {
            success: false,
            message: `Detectamos problemas con su repositorio. Ver detalles para mas informacion`,
            status: statusReturned
        } as GitCommandResponse        
    }
}