import { ipcRenderer, contextBridge } from 'electron';
import { FileSystemArgs, FileSystemOperation, FileSystemResponse } from './helpers/filesystem.helper';
import { GitCommandArgs, GitCommandResponse, GitOperation } from './helpers/gitcommands.helper';

declare global {
  interface Window {
    Main: typeof api;
    ipcRenderer: typeof ipcRenderer;
  }
}

const api = {
  /**
   * Here you can expose functions to the renderer process
   * so they can interact with the main (electron) side
   * without security problems.
   *
   * The function below can accessed using `window.Main.sayHello`
   */
  sendMessage: (message: string) => {
    ipcRenderer.send('message', message);
  },
  openBrowser: (url: string) => {
    ipcRenderer.send("open-browser", url);
  },
  git: async (command: GitOperation, args: GitCommandArgs): Promise<GitCommandResponse> => {
    return await ipcRenderer.invoke("execute-git-command", command, args)
  },
  fileSystem: async (operation: FileSystemOperation, args: FileSystemArgs): Promise<FileSystemResponse> => {
    return await ipcRenderer.invoke("execute-filesystem", operation, args);
  },
  /**
    Here function for AppBar
   */
  Minimize: () => {
    ipcRenderer.send('minimize');
  },
  Maximize: () => {
    ipcRenderer.send('maximize');
  },
  Close: () => {
    ipcRenderer.send('close');
  },
  /**
   * Provide an easier way to listen to events
   */
  on: (channel: string, callback: (data: any) => void) => {
    ipcRenderer.on(channel, (_, data) => callback(data));
  },
  removeEventListener: (channel: string) => {
    ipcRenderer.removeAllListeners(channel);
  }
};
contextBridge.exposeInMainWorld('Main', api);
/**
 * Using the ipcRenderer directly in the browser through the contextBridge ist not really secure.
 * I advise using the Main/api way !!
 */
contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer);
