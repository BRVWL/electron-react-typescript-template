import React from 'react';
import { Progress } from '@/renderer/components/ui/progress';

interface SystemMetricsProps {
  cpuUsage: number;
  memoryUsage: number;
}

const SystemMetrics: React.FC<SystemMetricsProps> = ({
  cpuUsage,
  memoryUsage,
}) => {
  return (
    <div className='grid grid-cols-2 gap-4'>
      <div className='space-y-2'>
        <div className='flex justify-between text-sm'>
          <span>CPU</span>
          <span className='font-mono'>{cpuUsage}%</span>
        </div>
        <Progress value={cpuUsage} className='h-1.5' />
      </div>
      <div className='space-y-2'>
        <div className='flex justify-between text-sm'>
          <span>Memory</span>
          <span className='font-mono'>{memoryUsage}%</span>
        </div>
        <Progress value={memoryUsage} className='h-1.5' />
      </div>
    </div>
  );
};

export default SystemMetrics;
