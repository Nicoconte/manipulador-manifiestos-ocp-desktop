import { PocketbaseCollections } from "../../data/enums/pbCollection.enum";
import { GitRepository } from "../../data/interfaces/gitRepository.interface";
import { parseGithubUrl } from "../../helpers/git.helper";
import { getPocketbaseErrorMessage } from "../../helpers/pocketbase.helper";
import { pb } from "../pocketbase";

export const GitRepositoryService = {
    getByName: async(name: string): Promise<GitRepository | null> => {
        try {
            name = name.replace(".git", "");
            return await pb.collection(PocketbaseCollections.GitRepositories).getFirstListItem<GitRepository>(`name="${name}"`);
        } catch(err) {
            throw getPocketbaseErrorMessage(err);
        }
    },
    getById: async(repoId: string): Promise<GitRepository | null> => {
        try {
            return await pb.collection(PocketbaseCollections.GitRepositories).getOne<GitRepository>(repoId);
        } catch(err) {
            throw getPocketbaseErrorMessage(err);
        }
    },
    getAll: async(sort: string = "-created"): Promise<GitRepository[]> => {
        try {
            return await pb.collection(PocketbaseCollections.GitRepositories).getFullList<GitRepository>(undefined, {
                sort: sort
            });
        } catch(err) {
            throw getPocketbaseErrorMessage(err);
        }
    },
    exists: async(name: string): Promise<boolean> => {
        try {
            name = name.replace(".git", "");
            return await pb.collection(PocketbaseCollections.GitRepositories).getFirstListItem<GitRepository>(`name="${name}"`) != null;
        }  catch(err) {
            return false;
        }
    },
    create: async(githubUrl: string): Promise<GitRepository> => {
        try {
            const { repositoryName, repositoryOwner } = parseGithubUrl(githubUrl);
    
            let repo = await pb.collection(PocketbaseCollections.GitRepositories).create<GitRepository>({
                github_url: githubUrl,
                organization: repositoryOwner,
                name: repositoryName.replace(".git", ""),
            })
    
            return repo;
            
        } catch(err) {
            throw getPocketbaseErrorMessage(err);
        }
    },
    update: async(repoId: string, githubUrl: string) => {
        try {
            let repo = await pb.collection(PocketbaseCollections.GitRepositories).getOne<GitRepository>(repoId);
    
            let obj = !githubUrl.includes(repo.organization) ? {
                github_url: githubUrl,
                organization: parseGithubUrl(githubUrl)["repositoryOwner"]
            } : {
                github_url: githubUrl
            }
    
            await pb.collection(PocketbaseCollections.GitRepositories).update(repoId, obj)
        } catch(err) {
            throw getPocketbaseErrorMessage(err);
        }
    }
}