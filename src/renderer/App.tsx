import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';
import type { SystemInfo, MemoryUsage, CpuUsage } from '@/shared/electron.d';

function App() {
  const [appVersion, setAppVersion] = useState<string>('Loading...');
  const [nodeVersion, setNodeVersion] = useState<string>('Loading...');
  const [chromeVersion, setChromeVersion] = useState<string>('Loading...');
  const [electronVersion, setElectronVersion] = useState<string>('Loading...');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [cpuUsage, setCpuUsage] = useState<number>(0);
  const [memoryUsage, setMemoryUsage] = useState<number>(0);
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null);

  useEffect(() => {
    // Get system information
    if (window.electronAPI) {
      Promise.all([
        window.electronAPI.getAppVersion(),
        window.electronAPI.getNodeVersion(),
        window.electronAPI.getChromeVersion(),
        window.electronAPI.getElectronVersion(),
        window.electronAPI.getSystemInfo(),
      ])
        .then(([app, node, chrome, electron, sysInfo]) => {
          setAppVersion(app);
          setNodeVersion(node);
          setChromeVersion(chrome);
          setElectronVersion(electron);
          setSystemInfo(sysInfo);
        })
        .catch(console.error);
    }

    // Real-time system monitoring
    const updateSystemMetrics = async () => {
      if (window.electronAPI) {
        try {
          const [memUsage, cpuUsageData] = await Promise.all([
            window.electronAPI.getMemoryUsage(),
            window.electronAPI.getCpuUsage(),
          ]);

          setMemoryUsage(memUsage.percentage);
          setCpuUsage(cpuUsageData.usage);
          setCurrentTime(new Date());
        } catch (error) {
          console.error('Failed to update system metrics:', error);
        }
      }
    };

    // Initial metrics load
    updateSystemMetrics();

    // Update metrics every 2 seconds
    const interval = setInterval(updateSystemMetrics, 2000);

    // Check network status
    const updateOnlineStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      clearInterval(interval);
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <TooltipProvider>
      <div
        className={`min-h-screen transition-all duration-300 ${
          darkMode ? 'dark bg-black text-white' : 'bg-gray-50 text-gray-900'
        }`}
      >
        {/* Apple-style window controls and header */}
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

        {/* Main content */}
        <div className='max-w-4xl mx-auto px-6 py-8 space-y-6'>
          {/* System status card */}
          <Card className='border-gray-200/50 dark:border-gray-800/50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm'>
            <CardHeader className='pb-4'>
              <CardTitle className='text-lg font-medium flex items-center gap-2'>
                <span className='w-2 h-2 rounded-full bg-blue-500'></span>
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              {/* Real-time metrics */}
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

              {/* Version grid */}
              <div className='grid grid-cols-4 gap-3 pt-4'>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className='text-center p-3 rounded-lg bg-gray-100/50 dark:bg-gray-800/50 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer'>
                      <div className='text-xs font-medium mb-1'>App</div>
                      <div className='text-xs font-mono text-gray-600 dark:text-gray-400'>
                        v{appVersion}
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>Application Version</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className='text-center p-3 rounded-lg bg-gray-100/50 dark:bg-gray-800/50 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer'>
                      <div className='text-xs font-medium mb-1'>Node</div>
                      <div className='text-xs font-mono text-gray-600 dark:text-gray-400'>
                        {nodeVersion}
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>Node.js Runtime</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className='text-center p-3 rounded-lg bg-gray-100/50 dark:bg-gray-800/50 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer'>
                      <div className='text-xs font-medium mb-1'>Chrome</div>
                      <div className='text-xs font-mono text-gray-600 dark:text-gray-400'>
                        {chromeVersion}
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>Chromium Engine</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className='text-center p-3 rounded-lg bg-gray-100/50 dark:bg-gray-800/50 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer'>
                      <div className='text-xs font-medium mb-1'>Electron</div>
                      <div className='text-xs font-mono text-gray-600 dark:text-gray-400'>
                        {electronVersion}
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>Electron Framework</TooltipContent>
                </Tooltip>
              </div>

              {/* System information */}
              {systemInfo && (
                <div className='mt-4 p-3 rounded-lg bg-gray-50/50 dark:bg-gray-800/50'>
                  <div className='text-xs font-medium mb-2 text-gray-700 dark:text-gray-300'>
                    System Information
                  </div>
                  <div className='grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400'>
                    <div>Platform: {systemInfo.platform}</div>
                    <div>Architecture: {systemInfo.arch}</div>
                    <div>CPU Cores: {systemInfo.cpuCount}</div>
                    <div>Hostname: {systemInfo.hostname}</div>
                    <div>
                      Total Memory:{' '}
                      {Math.round(
                        systemInfo.totalMemory / (1024 * 1024 * 1024)
                      )}
                      GB
                    </div>
                    <div>
                      Uptime: {Math.floor(systemInfo.uptime / 3600)}h{' '}
                      {Math.floor((systemInfo.uptime % 3600) / 60)}m
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick actions */}
          <Card className='border-gray-200/50 dark:border-gray-800/50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm'>
            <CardHeader className='pb-4'>
              <CardTitle className='text-lg font-medium flex items-center gap-2'>
                <span className='w-2 h-2 rounded-full bg-green-500'></span>
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-3 gap-3'>
                <Button
                  variant='outline'
                  className='h-16 flex-col gap-2 border-gray-200/50 dark:border-gray-800/50 hover:bg-gray-100/50 dark:hover:bg-gray-800/50'
                  onClick={() => window.electronAPI?.openDevTools?.()}
                >
                  <span className='text-lg'>🔧</span>
                  <span className='text-xs'>DevTools</span>
                </Button>

                <Button
                  variant='outline'
                  className='h-16 flex-col gap-2 border-gray-200/50 dark:border-gray-800/50 hover:bg-gray-100/50 dark:hover:bg-gray-800/50'
                  onClick={() => window.location.reload()}
                >
                  <span className='text-lg'>🔄</span>
                  <span className='text-xs'>Refresh</span>
                </Button>

                <Button
                  variant='outline'
                  className='h-16 flex-col gap-2 border-gray-200/50 dark:border-gray-800/50 hover:bg-gray-100/50 dark:hover:bg-gray-800/50'
                  onClick={() =>
                    console.log('App State:', {
                      darkMode,
                      cpuUsage,
                      memoryUsage,
                      isOnline,
                    })
                  }
                >
                  <span className='text-lg'>📊</span>
                  <span className='text-xs'>Log State</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* About */}
          <Card className='border-gray-200/50 dark:border-gray-800/50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm'>
            <CardContent className='pt-6'>
              <div className='text-center space-y-3'>
                <div className='w-12 h-12 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-xl text-white'>
                  ⚡
                </div>
                <h3 className='font-medium'>Electron Studio</h3>
                <p className='text-sm text-gray-600 dark:text-gray-400 max-w-md mx-auto'>
                  A minimalistic desktop application showcasing modern web
                  technologies
                </p>
                <div className='flex justify-center gap-2 pt-2'>
                  <Badge variant='secondary' className='text-xs'>
                    React
                  </Badge>
                  <Badge variant='secondary' className='text-xs'>
                    TypeScript
                  </Badge>
                  <Badge variant='secondary' className='text-xs'>
                    Tailwind
                  </Badge>
                  <Badge variant='secondary' className='text-xs'>
                    shadcn/ui
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  );
}

export default App;
