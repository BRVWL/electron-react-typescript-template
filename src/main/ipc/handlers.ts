import { app, ipcMain } from 'electron';

/**
 * Register all IPC handlers for the application
 */
export function registerIpcHandlers(): void {
  // Version information handlers
  ipcMain.handle('get-app-version', () => {
    return app.getVersion();
  });

  ipcMain.handle('get-node-version', () => {
    return process.versions.node;
  });

  ipcMain.handle('get-chrome-version', () => {
    return process.versions.chrome;
  });

  ipcMain.handle('get-electron-version', () => {
    return process.versions.electron;
  });

  // You can add more handler categories below with comments to organize them
  // For example:
  
  // File system handlers
  
  // User preferences handlers
  
  // etc.
} 