import { useState } from "react"
import { FileSystemOperation } from "../data/enums/fs.enum"
import { FileSystemArgs, FileSystemResponse } from "../data/interfaces/fs.interface"


type useFileSystemResponse = {
    fs: (operation: FileSystemOperation, args: FileSystemArgs) => Promise<FileSystemResponse>,
    fsResponse: FileSystemResponse
}

export const useFileSystem = () => {
    const [fsResponse, setFsResponse] = useState<FileSystemResponse | null>(null);

    async function fs(operation: FileSystemOperation, args: FileSystemArgs): Promise<FileSystemResponse> {
        let response = await window.Main.fileSystem(operation, args).then((res) => res);

        setFsResponse(response);

        return response;
    }

    return {
        fs,
        fsResponse
    } as useFileSystemResponse
}