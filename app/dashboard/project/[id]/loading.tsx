// app/dashboard/project/[id]/loading.tsx
export default function ProjectDetailsLoading() {
  return (
    <div className="w-full max-w-7xl mx-auto p-6 md:p-12 animate-pulse mt-4">
      {/* Top Bar / Breadcrumb Skeleton */}
      <div className="flex items-center gap-4 mb-8">
        <div className="h-10 w-24 bg-neutral-200 dark:bg-neutral-800 rounded-md"></div>
        <div className="h-6 w-64 bg-neutral-200 dark:bg-neutral-800 rounded-md ml-auto"></div>
      </div>

      {/* Project Header Skeleton */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <div className="h-12 w-80 bg-neutral-200 dark:bg-neutral-800 rounded-md mb-3"></div>
          <div className="h-5 w-48 bg-neutral-200 dark:bg-neutral-800 rounded-md"></div>
        </div>
        <div className="h-10 w-32 bg-neutral-200 dark:bg-neutral-800 rounded-full"></div>
      </div>

      {/* Main Workspace Grid (Video Area + Chat/Revisions Side Panel) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Video Player / Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Video Placeholder (16:9 Aspect Ratio) */}
          <div className="w-full aspect-video bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800 rounded-xl"></div>
          
          {/* Action Buttons Below Video */}
          <div className="flex gap-4">
            <div className="h-12 w-32 bg-neutral-200 dark:bg-neutral-800 rounded-md"></div>
            <div className="h-12 w-32 bg-neutral-200 dark:bg-neutral-800 rounded-md"></div>
          </div>
        </div>

        {/* Right Column: Chat & Tabs Panel */}
        <div className="lg:col-span-1 space-y-6">
          {/* Tabs Navigation Skeleton */}
          <div className="flex gap-2 mb-4 border-b border-neutral-200 dark:border-neutral-800 pb-2">
            <div className="h-8 w-20 bg-neutral-200 dark:bg-neutral-800 rounded-md"></div>
            <div className="h-8 w-24 bg-neutral-200 dark:bg-neutral-800 rounded-md"></div>
            <div className="h-8 w-20 bg-neutral-200 dark:bg-neutral-800 rounded-md"></div>
          </div>

          {/* Chat Messages Placeholder */}
          <div className="bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 h-100 flex flex-col justify-end gap-4">
            <div className="flex gap-3 w-3/4">
              <div className="h-10 w-10 bg-neutral-200 dark:bg-neutral-700 rounded-full shrink-0"></div>
              <div className="h-20 w-full bg-neutral-200 dark:bg-neutral-700 rounded-2xl rounded-tl-sm"></div>
            </div>
            <div className="flex gap-3 w-3/4 self-end flex-row-reverse">
              <div className="h-10 w-10 bg-neutral-200 dark:bg-neutral-700 rounded-full shrink-0"></div>
              <div className="h-16 w-full bg-neutral-200 dark:bg-neutral-700 rounded-2xl rounded-tr-sm"></div>
            </div>
            
            {/* Input Box Placeholder */}
            <div className="h-12 w-full bg-neutral-200 dark:bg-neutral-700 rounded-full mt-4"></div>
          </div>
        </div>

      </div>
    </div>
  );
}