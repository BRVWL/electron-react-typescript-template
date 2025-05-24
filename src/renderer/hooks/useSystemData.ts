import { useState, useEffect } from 'react';
import type { SystemInfo } from '@/shared/electron.d';

interface SystemData {
  app: string;
  node: string;
  chrome: string;
  electron: string;
  sysInfo: SystemInfo;
}

interface SystemMetrics {
  cpuUsage: number;
  memoryUsage: number;
  currentTime: Date;
}

export const useSystemData = () => {
  const [systemInfo, setSystemInfo] = useState<SystemData | null>(null);
  const [isLoadingInfo, setIsLoadingInfo] = useState(true);
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics>({
    cpuUsage: 0,
    memoryUsage: 0,
    currentTime: new Date(),
  });

  // Fetch system info
  const fetchSystemInfo = async () => {
    if (!window.electronAPI) {
      throw new Error('Electron API not available');
    }

    const [app, node, chrome, electron, sysInfo] = await Promise.all([
      window.electronAPI.getAppVersion(),
      window.electronAPI.getNodeVersion(),
      window.electronAPI.getChromeVersion(),
      window.electronAPI.getElectronVersion(),
      window.electronAPI.getSystemInfo(),
    ]);

    return { app, node, chrome, electron, sysInfo };
  };

  // Fetch system metrics
  const fetchSystemMetrics = async () => {
    if (!window.electronAPI) {
      throw new Error('Electron API not available');
    }

    const [memUsage, cpuUsageData] = await Promise.all([
      window.electronAPI.getMemoryUsage(),
      window.electronAPI.getCpuUsage(),
    ]);

    return {
      memoryPercentage: memUsage.percentage,
      cpuUsage: cpuUsageData.usage,
      timestamp: new Date(),
    };
  };

  // Initial data loading
  useEffect(() => {
    let mounted = true;

    const loadInitialData = async () => {
      try {
        const [info, metrics] = await Promise.all([
          fetchSystemInfo(),
          fetchSystemMetrics(),
        ]);

        if (mounted) {
          setSystemInfo(info);
          setSystemMetrics({
            cpuUsage: metrics.cpuUsage,
            memoryUsage: metrics.memoryPercentage,
            currentTime: metrics.timestamp,
          });
          setIsLoadingInfo(false);
        }
      } catch (error) {
        console.error('Failed to load initial data:', error);
        if (mounted) {
          setIsLoadingInfo(false);
        }
      }
    };

    loadInitialData();

    return () => {
      mounted = false;
    };
  }, []);

  // Real-time system monitoring
  useEffect(() => {
    const updateSystemMetrics = async () => {
      try {
        const metrics = await fetchSystemMetrics();
        setSystemMetrics({
          cpuUsage: metrics.cpuUsage,
          memoryUsage: metrics.memoryPercentage,
          currentTime: metrics.timestamp,
        });
      } catch (error) {
        console.error('Failed to update system metrics:', error);
      }
    };

    // Initial metrics load
    updateSystemMetrics();

    // Update metrics every 2 seconds
    const interval = setInterval(updateSystemMetrics, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const refreshSystemData = async () => {
    try {
      const [info, metrics] = await Promise.all([
        fetchSystemInfo(),
        fetchSystemMetrics(),
      ]);

      setSystemInfo(info);
      setSystemMetrics({
        cpuUsage: metrics.cpuUsage,
        memoryUsage: metrics.memoryPercentage,
        currentTime: metrics.timestamp,
      });
    } catch (error) {
      console.error('Failed to refresh data:', error);
      throw error;
    }
  };

  return {
    systemInfo,
    isLoadingInfo,
    systemMetrics,
    refreshSystemData,
  };
};
