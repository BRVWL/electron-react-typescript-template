import React, { startTransition } from 'react';
import { Button } from '@/renderer/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/renderer/components/ui/card';

interface QuickActionsCardProps {
  onDevToolsAction: () => void;
  onRefreshAction: () => void;
  onLogStateAction: () => void;
  isRefreshing: boolean;
}

const QuickActionsCard: React.FC<QuickActionsCardProps> = ({
  onDevToolsAction,
  onRefreshAction,
  onLogStateAction,
  isRefreshing,
}) => {
  const actions = [
    {
      emoji: '🔧',
      label: 'DevTools',
      onClick: onDevToolsAction,
      disabled: false,
    },
    {
      emoji: '🔄',
      label: isRefreshing ? 'Refreshing...' : 'Refresh',
      onClick: onRefreshAction,
      disabled: isRefreshing,
    },
    {
      emoji: '📊',
      label: 'Log State',
      onClick: onLogStateAction,
      disabled: false,
    },
  ];

  return (
    <Card className='border-gray-200/50 dark:border-gray-800/50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm'>
      <CardHeader className='pb-4'>
        <CardTitle className='text-lg font-medium flex items-center gap-2'>
          <span className='w-2 h-2 rounded-full bg-green-500'></span>
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-3 gap-3'>
          {actions.map(action => (
            <Button
              key={action.label}
              variant='outline'
              className='h-16 flex-col gap-2 border-gray-200/50 dark:border-gray-800/50 hover:bg-gray-100/50 dark:hover:bg-gray-800/50'
              onClick={action.onClick}
              disabled={action.disabled}
            >
              <span className='text-lg'>{action.emoji}</span>
              <span className='text-xs'>{action.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActionsCard;
