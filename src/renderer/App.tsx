import React, {
  useState,
  useOptimistic,
  useActionState,
  startTransition,
} from 'react';
import { TooltipProvider } from '@/renderer/components/ui/tooltip';
import SystemHeader from '@/renderer/components/SystemHeader';
import SystemStatusCard from '@/renderer/components/SystemStatusCard';
import QuickActionsCard from '@/renderer/components/QuickActionsCard';
import AboutCard from '@/renderer/components/AboutCard';
import { useSystemData } from '@/renderer/hooks/useSystemData';
import { useNetworkStatus } from '@/renderer/hooks/useNetworkStatus';

function App() {
  // Custom hooks for data management
  const { systemInfo, isLoadingInfo, systemMetrics, refreshSystemData } =
    useSystemData();
  const isOnline = useNetworkStatus();

  // Local state
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Use optimistic updates for system metrics
  const [optimisticMetrics, setOptimisticMetrics] = useOptimistic(
    systemMetrics,
    (state, newMetrics: Partial<typeof systemMetrics>) => ({
      ...state,
      ...newMetrics,
    })
  );

  // React 19 action for refreshing data
  const [refreshState, refreshAction] = useActionState(
    async (prevState: { isRefreshing: boolean }, formData: FormData) => {
      const action = formData.get('action') as string;

      if (action === 'refresh-all') {
        try {
          // Optimistically update loading state using startTransition
          startTransition(() => {
            setOptimisticMetrics({ ...systemMetrics, currentTime: new Date() });
          });

          await refreshSystemData();
          return { isRefreshing: false };
        } catch (error) {
          console.error('Failed to refresh data:', error);
          return { isRefreshing: false };
        }
      }

      return { isRefreshing: false };
    },
    { isRefreshing: false }
  );

  // React 19 action handlers with proper transitions
  const handleDevToolsAction = () => {
    startTransition(() => {
      setOptimisticMetrics({ ...optimisticMetrics, currentTime: new Date() });
      window.electronAPI?.openDevTools?.();
    });
  };

  const handleRefreshAction = () => {
    startTransition(() => {
      const formData = new FormData();
      formData.append('action', 'refresh-all');
      refreshAction(formData);
    });
  };

  const handleLogStateAction = () => {
    startTransition(() => {
      const currentState = {
        darkMode,
        cpuUsage: optimisticMetrics.cpuUsage,
        memoryUsage: optimisticMetrics.memoryUsage,
        isOnline,
        systemInfo,
        timestamp: new Date().toISOString(),
      };
      console.log('App State (React 19):', currentState);
    });
  };
  return (
    <TooltipProvider>
      <div
        className={`min-h-screen transition-all duration-300 ${
          darkMode ? 'dark bg-black text-white' : 'bg-gray-50 text-gray-900'
        }`}
      >
        <SystemHeader
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          isOnline={isOnline}
          currentTime={optimisticMetrics.currentTime}
        />

        <div className='max-w-4xl mx-auto px-6 py-8 space-y-6'>
          <SystemStatusCard
            optimisticMetrics={optimisticMetrics}
            isLoadingInfo={isLoadingInfo}
            systemInfo={systemInfo}
          />

          <QuickActionsCard
            onDevToolsAction={handleDevToolsAction}
            onRefreshAction={handleRefreshAction}
            onLogStateAction={handleLogStateAction}
            isRefreshing={refreshState.isRefreshing}
          />

          <AboutCard />
        </div>
      </div>
    </TooltipProvider>
  );
}

export default App;
