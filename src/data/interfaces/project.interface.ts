import { Branches } from "./branches.interfaces";
import { GitRepository } from "./gitRepository.interface";

export interface Project {
    id: string,
    name: string, 
    last_update: Date,
    repository: string
}

export interface ProjectApplication {
    name: string,
    branch: Branches,
    errors: string[]
}