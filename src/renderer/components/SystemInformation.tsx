import React from 'react';
import type { SystemInfo } from '@/shared/electron.d';

interface SystemInformationProps {
  sysInfo: SystemInfo;
}

const SystemInformation: React.FC<SystemInformationProps> = ({ sysInfo }) => {
  return (
    <div className='mt-4 p-3 rounded-lg bg-gray-50/50 dark:bg-gray-800/50'>
      <div className='text-xs font-medium mb-2 text-gray-700 dark:text-gray-300'>
        System Information
      </div>
      <div className='grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400'>
        <div>Platform: {sysInfo.platform}</div>
        <div>Architecture: {sysInfo.arch}</div>
        <div>CPU Cores: {sysInfo.cpuCount}</div>
        <div>Hostname: {sysInfo.hostname}</div>
        <div>
          Total Memory: {Math.round(sysInfo.totalMemory / (1024 * 1024 * 1024))}
          GB
        </div>
        <div>
          Uptime: {Math.floor(sysInfo.uptime / 3600)}h{' '}
          {Math.floor((sysInfo.uptime % 3600) / 60)}m
        </div>
      </div>
    </div>
  );
};

export default SystemInformation;
