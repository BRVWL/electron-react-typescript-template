import React from 'react';
import { Badge } from '@/renderer/components/ui/badge';
import { Switch } from '@/renderer/components/ui/switch';

interface SystemHeaderProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  isOnline: boolean;
  currentTime: Date;
}

const SystemHeader: React.FC<SystemHeaderProps> = ({
  darkMode,
  setDarkMode,
  isOnline,
  currentTime,
}) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className='sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-black/80 border-b border-gray-200/30 dark:border-gray-800/30'>
      <div className='max-w-4xl mx-auto px-6 py-3 flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <h1 className='ml-4 text-sm font-medium'>Electron Studio</h1>
        </div>

        <div className='flex items-center gap-4'>
          <Badge
            variant={isOnline ? 'default' : 'destructive'}
            className='text-xs px-2 py-1'
          >
            {isOnline ? '● Online' : '● Offline'}
          </Badge>
          <span className='text-xs font-mono text-gray-500'>
            {formatTime(currentTime)}
          </span>
          <Switch
            checked={darkMode}
            onCheckedChange={setDarkMode}
            className='scale-75'
          />
        </div>
      </div>
    </div>
  );
};

export default SystemHeader;
