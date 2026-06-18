// app/dashboard/loading.tsx
export default function HomeLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] md:min-h-[75vh] px-5 text-center animate-pulse">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-8xl font-bebas uppercase text-neutral-800 dark:text-neutral-100 leading-tight md:leading-none">
          Welcome to <br className="md:hidden" /> rupamedits.com
        </h1>

        <p className="mt-6 text-neutral-500 md:text-xl max-w-xl mx-auto">
          Preparing the experience...
        </p>
      </div>
    </div>
  );
}