/**
 * Type definitions for Electron API
 * This makes TypeScript aware of our API exposed via contextBridge
 */

export interface IElectronAPI {
  getAppVersion: () => Promise<string>;
  getNodeVersion: () => Promise<string>;
  getChromeVersion: () => Promise<string>;
  getElectronVersion: () => Promise<string>;
  // Add more API methods here as your app grows
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
} 