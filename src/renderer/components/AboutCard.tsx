import React from 'react';
import { Badge } from '@/renderer/components/ui/badge';
import { Card, CardContent } from '@/renderer/components/ui/card';

const AboutCard: React.FC = () => {
  const technologies = ['React 19', 'TypeScript', 'Tailwind', 'shadcn/ui'];

  return (
    <Card className='border-gray-200/50 dark:border-gray-800/50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm'>
      <CardContent className='pt-6'>
        <div className='text-center space-y-3'>
          <div className='w-12 h-12 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-xl text-white'>
            ⚡
          </div>
          <h3 className='font-medium'>Electron Studio</h3>
          <p className='text-sm text-gray-600 dark:text-gray-400 max-w-md mx-auto'>
            A modern desktop application showcasing React 19 features with
            optimistic updates and async state management
          </p>
          <div className='flex justify-center gap-2 pt-2'>
            {technologies.map(tech => (
              <Badge key={tech} variant='secondary' className='text-xs'>
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AboutCard;
