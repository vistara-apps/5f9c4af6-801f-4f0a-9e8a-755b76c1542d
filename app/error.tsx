'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="w-16 h-16 mx-auto rounded-full bg-red-500/20 flex items-center justify-center">
          <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-text-primary mb-2">
            Something went wrong!
          </h2>
          <p className="text-text-secondary text-sm">
            We encountered an error while loading TuneSphere. Please try again.
          </p>
        </div>
        <button
          onClick={reset}
          className="px-6 py-3 gradient-bg text-white rounded-lg font-medium hover:opacity-90 transition-opacity duration-200"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
