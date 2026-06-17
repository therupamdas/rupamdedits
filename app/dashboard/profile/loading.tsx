// app/dashboard/profile/loading.tsx
export default function ProfileLoading() {
  return (
    <div className="w-full max-w-3xl mx-auto p-6 md:p-12 animate-pulse mt-8">
      {/* Profile Header Skeleton */}
      <div className="flex items-center gap-6 mb-10">
        <div className="h-24 w-24 bg-neutral-200 dark:bg-neutral-800 rounded-full shrink-0"></div>
        <div className="space-y-3 w-full">
          <div className="h-8 w-1/3 bg-neutral-200 dark:bg-neutral-800 rounded-md"></div>
          <div className="h-4 w-1/4 bg-neutral-200 dark:bg-neutral-800 rounded-md"></div>
        </div>
      </div>

      {/* Form Fields Skeleton */}
      <div className="bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800 rounded-xl p-8 space-y-6">
        <div className="space-y-2">
          <div className="h-4 w-24 bg-neutral-200 dark:bg-neutral-800 rounded-md"></div>
          <div className="h-12 w-full bg-neutral-200 dark:bg-neutral-800 rounded-md"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 w-24 bg-neutral-200 dark:bg-neutral-800 rounded-md"></div>
          <div className="h-12 w-full bg-neutral-200 dark:bg-neutral-800 rounded-md"></div>
        </div>
        <div className="pt-4">
          <div className="h-12 w-32 bg-neutral-200 dark:bg-neutral-800 rounded-md"></div>
        </div>
      </div>
    </div>
  );
}