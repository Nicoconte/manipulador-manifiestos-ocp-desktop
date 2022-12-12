import { Project } from "./project.interface";

export interface GitRepository {
    id: string,
    name: string,
    github_url: string,
    organization: string,
    projects: string[],
    fullPath: string,
}