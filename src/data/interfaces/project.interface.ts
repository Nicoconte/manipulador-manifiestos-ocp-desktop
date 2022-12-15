import { GitRepository } from "./gitRepository.interface";

export interface Project {
    id: string,
    name: string, 
    last_update: Date,
    repository: GitRepository
}