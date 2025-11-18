import React from 'react';

interface LoadingSkeletonProps {
  variant?: 'card' | 'table' | 'text' | 'avatar' | 'button';
  width?: string;
  height?: string;
  count?: number;
  className?: string;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  variant = 'text',
  width,
  height,
  count = 1,
  className = ''
}) => {
  const baseClasses = 'bg-gray-700 animate-pulse rounded';

  const getVariantClasses = () => {
    switch (variant) {
      case 'card':
        return 'h-48 w-full';
      case 'table':
        return 'h-12 w-full';
      case 'text':
        return 'h-4 w-full';
      case 'avatar':
        return 'h-10 w-10 rounded-full';
      case 'button':
        return 'h-10 w-24';
      default:
        return 'h-4 w-full';
    }
  };

  const style = {
    ...(width && { width }),
    ...(height && { height })
  };

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={`${baseClasses} ${getVariantClasses()} ${className}`}
          style={style}
        />
      ))}
    </>
  );
};

export const CardSkeleton: React.FC = () => (
  <div className="bg-gray-800 rounded-lg p-6 space-y-4">
    <LoadingSkeleton variant="text" width="60%" />
    <LoadingSkeleton variant="text" width="40%" />
    <LoadingSkeleton variant="card" height="120px" />
    <div className="flex gap-2">
      <LoadingSkeleton variant="button" />
      <LoadingSkeleton variant="button" />
    </div>
  </div>
);

export const TableSkeleton: React.FC<{ rows?: number }> = ({ rows = 5 }) => (
  <div className="bg-gray-800 rounded-lg overflow-hidden">
    <div className="p-4 border-b border-gray-700">
      <LoadingSkeleton variant="table" height="40px" />
    </div>
    <div className="divide-y divide-gray-700">
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="p-4">
          <LoadingSkeleton variant="table" />
        </div>
      ))}
    </div>
  </div>
);

export const DashboardSkeleton: React.FC = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <CardSkeleton />
      <CardSkeleton />
    </div>
    <TableSkeleton />
  </div>
);

export default LoadingSkeleton;
