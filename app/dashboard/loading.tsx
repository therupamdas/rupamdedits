// app/dashboard/loading.tsx
export default function DashboardLoading() {
  return (
    <div className="w-full max-w-6xl mx-auto p-6 md:p-12 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
        <div>
          <div className="h-10 w-64 bg-neutral-200 dark:bg-neutral-800 rounded-md mb-2"></div>
          <div className="h-4 w-48 bg-neutral-200 dark:bg-neutral-800 rounded-md"></div>
        </div>
        <div className="h-12 w-32 bg-neutral-200 dark:bg-neutral-800 rounded-md"></div>
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-32 bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800 rounded-xl"></div>
        ))}
      </div>

      {/* Project List Skeleton */}
      <div className="space-y-4">
        <div className="h-8 w-40 bg-neutral-200 dark:bg-neutral-800 rounded-md mb-6"></div>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800 rounded-xl"></div>
        ))}
      </div>
    </div>
  );
}