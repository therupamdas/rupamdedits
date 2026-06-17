// app/login/loading.tsx
export default function LoginLoading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Optional: Background gradient blurs to match your SpotlightBackground if needed */}
      <div className="absolute top-[20%] left-[30%] w-96 h-96 bg-green-200/20 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[30%] w-96 h-96 bg-blue-200/20 rounded-full filter blur-[100px] pointer-events-none" />

      {/* Auth Card Skeleton */}
      <div className="relative z-10 w-full max-w-md p-8 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 rounded-2xl animate-pulse shadow-xl">
        
        {/* Title & Subtitle Skeleton */}
        <div className="flex flex-col items-center mb-8">
          <div className="h-8 w-40 bg-neutral-200 dark:bg-neutral-800 rounded-md mb-3"></div>
          <div className="h-4 w-56 bg-neutral-200 dark:bg-neutral-800 rounded-md"></div>
        </div>

        {/* Form Inputs Skeleton */}
        <div className="space-y-5 mb-6">
          <div className="space-y-2">
            <div className="h-4 w-16 bg-neutral-200 dark:bg-neutral-800 rounded-md"></div>
            <div className="h-12 w-full bg-neutral-200 dark:bg-neutral-800 rounded-md"></div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <div className="h-4 w-20 bg-neutral-200 dark:bg-neutral-800 rounded-md"></div>
              <div className="h-4 w-24 bg-neutral-200 dark:bg-neutral-800 rounded-md"></div>
            </div>
            <div className="h-12 w-full bg-neutral-200 dark:bg-neutral-800 rounded-md"></div>
          </div>
        </div>

        {/* Login Button Skeleton (Slightly darker to mimic primary button) */}
        <div className="h-12 w-full bg-neutral-300 dark:bg-neutral-700 rounded-md mb-6"></div>

        {/* Footer/Divider Skeleton */}
        <div className="flex items-center justify-center gap-4">
          <div className="h-1 w-full bg-neutral-200 dark:bg-neutral-800"></div>
          <div className="h-4 w-32 bg-neutral-200 dark:bg-neutral-800 rounded-md shrink-0"></div>
          <div className="h-1 w-full bg-neutral-200 dark:bg-neutral-800"></div>
        </div>
      </div>
    </div>
  );
}