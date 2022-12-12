import { PocketbaseCollections } from "../../data/enums/pbCollection.enum"
import { GitRepository } from "../../data/interfaces/gitRepository.interface"
import { Project } from "../../data/interfaces/project.interface";
import { getPocketbaseErrorMessage } from "../../helpers/pocketbase.helper";
import { pb } from "../pocketbase"


export const ProjectService = {
    createProject: async(name: string): Promise<Project> => {
        try {
            let project = await pb.collection(PocketbaseCollections.Projects).create<Project>({
                name: name,
                last_update: new Date()
            });
    
            return project;

        } catch(err) {
            throw getPocketbaseErrorMessage(err)
        }
    },
    setProjectToRepository: async(repoId: string, projectId: string): Promise<void> => {
        try {
            let repo = await pb.collection(PocketbaseCollections.GitRepositories).getOne<GitRepository>(repoId);

            let currentProjects = repo.projects;
    
            currentProjects.push(projectId);
    
            await pb.collection(PocketbaseCollections.GitRepositories).update(repoId, {
                projects: currentProjects
            })

        } catch(err) {
            throw getPocketbaseErrorMessage(err);
        }
    }
}