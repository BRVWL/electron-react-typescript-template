import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/renderer/components/ui/card';
import SystemMetrics from './SystemMetrics';
import VersionGrid from './VersionGrid';
import SystemInformation from './SystemInformation';
import type { SystemInfo } from '@/shared/electron.d';

interface SystemStatusCardProps {
  optimisticMetrics: {
    cpuUsage: number;
    memoryUsage: number;
    currentTime: Date;
  };
  isLoadingInfo: boolean;
  systemInfo: {
    app: string;
    node: string;
    chrome: string;
    electron: string;
    sysInfo: SystemInfo;
  } | null;
}

const SystemStatusCard: React.FC<SystemStatusCardProps> = ({
  optimisticMetrics,
  isLoadingInfo,
  systemInfo,
}) => {
  return (
    <Card className='border-gray-200/50 dark:border-gray-800/50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm'>
      <CardHeader className='pb-4'>
        <CardTitle className='text-lg font-medium flex items-center gap-2'>
          <span className='w-2 h-2 rounded-full bg-blue-500'></span>
          System Status
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <SystemMetrics
          cpuUsage={optimisticMetrics.cpuUsage}
          memoryUsage={optimisticMetrics.memoryUsage}
        />

        <VersionGrid isLoadingInfo={isLoadingInfo} systemInfo={systemInfo} />

        {systemInfo?.sysInfo && (
          <SystemInformation sysInfo={systemInfo.sysInfo} />
        )}
      </CardContent>
    </Card>
  );
};

export default SystemStatusCard;
