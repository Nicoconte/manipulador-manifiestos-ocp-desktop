import { PocketbaseCollections } from "../../data/enums/pbCollection.enum"
import { GitRepository } from "../../data/interfaces/gitRepository.interface"
import { Project } from "../../data/interfaces/project.interface";
import { getPocketbaseErrorMessage } from "../../helpers/pocketbase.helper";
import { pb } from "../pocketbase"


export const ProjectService = {
    createProject: async(repositoryId: string, projectName: string): Promise<Project> => {
        try {
            let project = await pb.collection(PocketbaseCollections.Projects).create<Project>({
                name: projectName,
                last_update: new Date(),
                repository: repositoryId
            });
    
            return project;

        } catch(err) {
            throw getPocketbaseErrorMessage(err)
        }
    },
    getFirstFiveProjectsFromRepository: async (repositoryId: string): Promise<Project[]> => {
        try {
            let projects = await pb.collection(PocketbaseCollections.Projects).getList<Project>(1, 5, {
                filter: `repository="${repositoryId}"` 
            })

            return projects.items;
        } catch(err) {
            throw getPocketbaseErrorMessage(err);
        }
    }
}