import React from 'react';
import { Check, X, Minus } from 'lucide-react';
import type { ChecklistStatus } from '../../types/compliance';
import { cn } from '../../lib/utils';

interface StatusIndicatorProps {
  status: ChecklistStatus;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  showLabel = true,
  size = 'md',
}) => {
  const iconSize = size === 'sm' ? 16 : size === 'md' ? 20 : 24;

  const getStatusConfig = () => {
    switch (status) {
      case 'TAK':
        return {
          icon: <Check size={iconSize} />,
          className: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20',
          label: 'TAK',
        };
      case 'NIE':
        return {
          icon: <X size={iconSize} />,
          className: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20',
          label: 'NIE',
        };
      case 'ND':
        return {
          icon: <Minus size={iconSize} />,
          className: 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800',
          label: 'ND',
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          'rounded-full p-1.5 flex items-center justify-center',
          config.className
        )}
      >
        {config.icon}
      </div>
      {showLabel && (
        <span className={cn('font-medium', config.className.split('bg-')[0])}>
          {config.label}
        </span>
      )}
    </div>
  );
};
