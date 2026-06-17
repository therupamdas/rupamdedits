// app/portfolio/loading.tsx
export default function PortfolioLoading() {
  return (
    <div className="max-w-6xl mx-auto p-6 md:p-12 animate-pulse">
      {/* Header Skeleton - Matches the "PORTFOLIO SHOWCASE" Bebas text */}
      <div className="h-16 w-80 bg-neutral-200 dark:bg-neutral-800 rounded-md mb-8"></div>

      {/* Projects Grid Skeleton */}
      <div className="grid md:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div 
            key={i} 
            className="bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-800 p-6 rounded-xl h-36 flex flex-col justify-between"
          >
            {/* Project Title Placeholder */}
            <div className="h-6 w-3/4 bg-neutral-200 dark:bg-neutral-700 rounded-md"></div>
            
            {/* "View Case Study" Link Placeholder */}
            <div className="h-4 w-1/3 bg-neutral-200 dark:bg-neutral-700 rounded-md mt-auto"></div>
          </div>
        ))}
      </div>
    </div>
  );
}