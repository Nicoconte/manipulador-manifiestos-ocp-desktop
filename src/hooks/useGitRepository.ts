import { useEffect, useState } from "react";
import { GitRepositoryService } from "../api/services/gitRepository.service";
import { SettingService } from "../api/services/setting.service";

import { GitRepository } from "../data/interfaces/gitRepository.interface";

type useGitRepositoryResponse = {
    repository: GitRepository | null
}

export const useGitRepository = () : useGitRepositoryResponse => {
    const [repository, setRepository] = useState<GitRepository | null>(null);

    useEffect(() => {
        SettingService.getGlobalSetting().then(setting => {
            let repositoryName = localStorage.getItem("current_repo");

            if (!repositoryName) {
                throw "Invalid repository name. It cannot be empty";
            }

            GitRepositoryService.getByName(repositoryName).then(repo => {
                repo!.fullPath = setting.local_path_to_repositories.concat("/", repo!.name)                
                setRepository(repo);
            })
        })
    }, []);

    return {
        repository
    } as useGitRepositoryResponse
}
