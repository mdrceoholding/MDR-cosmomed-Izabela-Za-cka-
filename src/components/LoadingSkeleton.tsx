interface LoadingSkeletonProps {
  type?: 'card' | 'table' | 'chart' | 'text';
  count?: number;
}

export default function LoadingSkeleton({ type = 'card', count = 1 }: LoadingSkeletonProps) {
  const skeletons = Array.from({ length: count });

  if (type === 'card') {
    return (
      <>
        {skeletons.map((_, idx) => (
          <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 animate-pulse">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-3"></div>
                <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
              <div className="bg-gray-300 dark:bg-gray-700 rounded-full h-12 w-12"></div>
            </div>
          </div>
        ))}
      </>
    );
  }

  if (type === 'table') {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden animate-pulse">
        <div className="bg-gray-200 dark:bg-gray-700 h-12"></div>
        {skeletons.map((_, idx) => (
          <div key={idx} className="border-t border-gray-200 dark:border-gray-700 p-4">
            <div className="flex gap-4">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded flex-1"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded flex-1"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded flex-1"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded flex-1"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'chart') {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 animate-pulse">
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/3 mb-6"></div>
        <div className="h-64 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>
    );
  }

  // type === 'text'
  return (
    <>
      {skeletons.map((_, idx) => (
        <div key={idx} className="animate-pulse mb-2">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
        </div>
      ))}
    </>
  );
}
