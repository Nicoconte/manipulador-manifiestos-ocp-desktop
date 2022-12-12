import { useEffect, useState } from "react";
import { GitRepositoryService } from "../api/services/gitRepository.service";
import { SettingService } from "../api/services/setting.service";

import { GitRepository } from "../data/interfaces/gitRepository.interface";

type useGitRepositoryResponse = {
    localRepository: GitRepository | null
}

export const useGitRepository = () : useGitRepositoryResponse => {
    const [localRepository, setLocalRepository] = useState<GitRepository | null>(null);

    useEffect(() => {
        SettingService.get().then(setting => {
            let repositoryName = localStorage.getItem("current_repo");

            if (!repositoryName) {
                throw "Invalid repository name. It cannot be empty";
            }

            GitRepositoryService.getByName(repositoryName).then(repo => {
                repo!.fullPath = setting.local_path_to_repositories.concat("/", repo!.name)                
                setLocalRepository(repo);
            })
        })
    }, [localRepository]);

    return {
        localRepository
    } as useGitRepositoryResponse
}
