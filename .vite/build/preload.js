"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electronAPI", {
  // Version API methods
  getAppVersion: () => electron.ipcRenderer.invoke("get-app-version"),
  getNodeVersion: () => electron.ipcRenderer.invoke("get-node-version"),
  getChromeVersion: () => electron.ipcRenderer.invoke("get-chrome-version"),
  getElectronVersion: () => electron.ipcRenderer.invoke("get-electron-version"),
  // Developer tools
  openDevTools: () => electron.ipcRenderer.invoke("open-dev-tools"),
  // System monitoring API methods
  getSystemInfo: () => electron.ipcRenderer.invoke("get-system-info"),
  getMemoryUsage: () => electron.ipcRenderer.invoke("get-memory-usage"),
  getCpuUsage: () => electron.ipcRenderer.invoke("get-cpu-usage"),
  getProcessInfo: () => electron.ipcRenderer.invoke("get-process-info")
});
