import { exec } from "child_process";

export const ExecuteCommand = (
    cmd: string, 
    workingDirectory: string,
    successOutputCallback: Function | null = null, 
    errorOutputCallback: Function | null = null,  
    executionErrorCallback: Function | null = null
) => {    
    exec(cmd, { cwd: workingDirectory }, (error, stdout, stderr) => {
        if (error && executionErrorCallback) {
            executionErrorCallback(error);
            return;
        }
        if (stderr && errorOutputCallback) {
            errorOutputCallback(stderr);
            return;
        } 

        if (successOutputCallback) {
            successOutputCallback(stdout);
            return;
        }
    });    
}