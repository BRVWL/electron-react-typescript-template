/**
 * Type definitions for Electron API
 * This makes TypeScript aware of our API exposed via contextBridge
 */

export interface SystemInfo {
  platform: string;
  arch: string;
  totalMemory: number;
  hostname: string;
  uptime: number;
  cpuCount: number;
  loadAverage: number[];
}

export interface MemoryUsage {
  total: number;
  free: number;
  used: number;
  percentage: number;
}

export interface CpuUsage {
  usage: number;
  loadAverage: number[];
  cores: number;
  model: string;
}

export interface ProcessInfo {
  pid: number;
  uptime: number;
  memoryUsage: {
    rss: number;
    heapTotal: number;
    heapUsed: number;
    external: number;
  };
  cpuUsage: {
    user: number;
    system: number;
  };
}

export interface IElectronAPI {
  getAppVersion: () => Promise<string>;
  getNodeVersion: () => Promise<string>;
  getChromeVersion: () => Promise<string>;
  getElectronVersion: () => Promise<string>;
  openDevTools: () => Promise<void>;
  getSystemInfo: () => Promise<SystemInfo>;
  getMemoryUsage: () => Promise<MemoryUsage>;
  getCpuUsage: () => Promise<CpuUsage>;
  getProcessInfo: () => Promise<ProcessInfo>;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
