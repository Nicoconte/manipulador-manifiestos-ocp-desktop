// Native
import { join } from 'path';

const killProcess = require("kill-process-by-name");

// Packages
import { BrowserWindow, app, ipcMain, IpcMainEvent, IpcMainInvokeEvent } from 'electron';
import isDev from 'electron-is-dev';
import { ExecuteCommand } from './helpers/exec.helper';
import { GitCommandArgs, executeGitCommand, GitOperation } from './helpers/gitcommands.helper';
import { executeFileSystem, FileSystemArgs } from './helpers/filesystem.helper';

const height = 700;
const width = 1024;

function servePocketbase() {
  ExecuteCommand("cd ./backend & pocketbase serve", "./", (stdout: any) => {
    console.log(`stdout: ${stdout}`)
  })
}

function createWindow() {
  // Create the browser window.
  const window = new BrowserWindow({
    width,
    height,
    //  change to false to use AppBar
    autoHideMenuBar: true,
    show: true,
    resizable: true,
    fullscreenable: true,
    webPreferences: {
      preload: join(__dirname, 'preload.js')
    }
  });

  const port = process.env.PORT || 8092;
  const url = isDev ? `http://localhost:${port}` : join(__dirname, '../src/out/index.html');

  // and load the index.html of the app.
  if (isDev) {
    window?.loadURL(url);
  } else {
    window?.loadFile(url);
  }
  // Open the DevTools.
  window.webContents.openDevTools();

  // For AppBar
  ipcMain.on('minimize', () => {
    // eslint-disable-next-line no-unused-expressions
    window.isMinimized() ? window.restore() : window.minimize();
    // or alternatively: win.isVisible() ? win.hide() : win.show()
  });
  ipcMain.on('maximize', () => {
    // eslint-disable-next-line no-unused-expressions
    window.isMaximized() ? window.restore() : window.maximize();
  });

  ipcMain.on('close', () => {
    killProcess("pocketbase");
    window.close();
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  servePocketbase();

  createWindow();

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// listen the channel `message` and resend the received message to the renderer process
ipcMain.on('message', (event: IpcMainEvent, message: any) => {
  console.log("se supone que llega aca => ", message);
  setTimeout(() => event.sender.send('message', 'hi from electron'), 500);
});


//Ver de refactorizar esto. Tal vez una ipc por cada evento de git
//Una funcion ipc y en el helper por comando 
ipcMain.handle("execute-git-command", async(_event: IpcMainInvokeEvent, command: GitOperation, args: GitCommandArgs) => {
  console.log("Command => ", command, " args => ", args);

  return await executeGitCommand[command](args);
});

ipcMain.handle("execute-filesystem", async(_event: IpcMainInvokeEvent, operation: string, args: FileSystemArgs) => {
  console.log("Operation =>", operation, "args =>", args);
 
  return await executeFileSystem[operation](args);
})

ipcMain.on("open-browser", (event: IpcMainEvent, url: string) => {
  require("electron").shell.openExternal(url);
  event.sender.send("open-browser", null);
});