"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electronAPI", {
  // Example API method
  getAppVersion: () => electron.ipcRenderer.invoke("get-app-version"),
  getNodeVersion: () => electron.ipcRenderer.invoke("get-node-version"),
  getChromeVersion: () => electron.ipcRenderer.invoke("get-chrome-version"),
  getElectronVersion: () => electron.ipcRenderer.invoke("get-electron-version")
  // You can add more API methods here as your app grows
});
