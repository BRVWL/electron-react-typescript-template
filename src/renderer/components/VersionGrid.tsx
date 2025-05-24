import React from 'react';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/renderer/components/ui/tooltip';

interface VersionGridProps {
  isLoadingInfo: boolean;
  systemInfo: {
    app: string;
    node: string;
    chrome: string;
    electron: string;
  } | null;
}

const VersionGrid: React.FC<VersionGridProps> = ({
  isLoadingInfo,
  systemInfo,
}) => {
  const versionItems = [
    {
      label: 'App',
      value: isLoadingInfo ? 'Loading...' : `v${systemInfo?.app || 'N/A'}`,
      tooltip: 'Application Version',
    },
    {
      label: 'Node',
      value: isLoadingInfo ? 'Loading...' : systemInfo?.node || 'N/A',
      tooltip: 'Node.js Runtime',
    },
    {
      label: 'Chrome',
      value: isLoadingInfo ? 'Loading...' : systemInfo?.chrome || 'N/A',
      tooltip: 'Chromium Engine',
    },
    {
      label: 'Electron',
      value: isLoadingInfo ? 'Loading...' : systemInfo?.electron || 'N/A',
      tooltip: 'Electron Framework',
    },
  ];

  return (
    <div className='grid grid-cols-4 gap-3 pt-4'>
      {versionItems.map(item => (
        <Tooltip key={item.label}>
          <TooltipTrigger asChild>
            <div className='text-center p-3 rounded-lg bg-gray-100/50 dark:bg-gray-800/50 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer'>
              <div className='text-xs font-medium mb-1'>{item.label}</div>
              <div className='text-xs font-mono text-gray-600 dark:text-gray-400'>
                {item.value}
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent>{item.tooltip}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
};

export default VersionGrid;
