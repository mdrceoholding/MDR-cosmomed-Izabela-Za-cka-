interface LoadingSkeletonProps {
  type?: 'card' | 'table' | 'list';
  count?: number;
}

export default function LoadingSkeleton({ type = 'card', count = 3 }: LoadingSkeletonProps) {
  if (type === 'card') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="bg-slate-800 rounded-xl p-6 animate-pulse">
            <div className="w-16 h-16 bg-slate-700 rounded-full mx-auto mb-4"></div>
            <div className="h-4 bg-slate-700 rounded w-3/4 mx-auto mb-2"></div>
            <div className="h-3 bg-slate-700 rounded w-full mb-2"></div>
            <div className="h-3 bg-slate-700 rounded w-5/6 mx-auto"></div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div className="bg-slate-800 rounded-xl p-6 animate-pulse">
        <div className="h-8 bg-slate-700 rounded w-1/3 mb-4"></div>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="h-12 bg-slate-700 rounded mb-2"></div>
        ))}
      </div>
    );
  }

  if (type === 'list') {
    return (
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="bg-slate-800 rounded-xl p-4 flex items-center gap-4 animate-pulse">
            <div className="w-12 h-12 bg-slate-700 rounded-full"></div>
            <div className="flex-1">
              <div className="h-4 bg-slate-700 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-slate-700 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return null;
}
