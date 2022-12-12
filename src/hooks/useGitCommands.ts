import { useState } from "react";

import { GitOperation } from "../data/enums/git.enum"
import { GitCommandArgs, GitCommandResponse } from "../data/interfaces/git.interface"

type useGitCommandResponse = {
    git: (command: GitOperation, args: GitCommandArgs) => Promise<GitCommandResponse>,
    gitCommandResponse: GitCommandResponse,
}

export const useGitCommand = () : useGitCommandResponse => {    
    const [gitCommandResponse, setGitCommandResponse] = useState<GitCommandResponse | null>(null);

    async function git(command: GitOperation, args: GitCommandArgs) : Promise<GitCommandResponse> {          
        let response = await window.Main.git(command, args);

        setGitCommandResponse(response);

        return response;
    }

    return {
        git,
        gitCommandResponse
    } as useGitCommandResponse
}
