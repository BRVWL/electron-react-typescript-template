// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Version API methods
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  getNodeVersion: () => ipcRenderer.invoke('get-node-version'),
  getChromeVersion: () => ipcRenderer.invoke('get-chrome-version'),
  getElectronVersion: () => ipcRenderer.invoke('get-electron-version'),

  // Developer tools
  openDevTools: () => ipcRenderer.invoke('open-dev-tools'),

  // System monitoring API methods
  getSystemInfo: () => ipcRenderer.invoke('get-system-info'),
  getMemoryUsage: () => ipcRenderer.invoke('get-memory-usage'),
  getCpuUsage: () => ipcRenderer.invoke('get-cpu-usage'),
  getProcessInfo: () => ipcRenderer.invoke('get-process-info'),
});
