// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Example API method
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  getNodeVersion: () => ipcRenderer.invoke('get-node-version'),
  getChromeVersion: () => ipcRenderer.invoke('get-chrome-version'),
  getElectronVersion: () => ipcRenderer.invoke('get-electron-version'),
  // You can add more API methods here as your app grows
});
