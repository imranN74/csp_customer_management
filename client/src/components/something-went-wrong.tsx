import { TriangleAlert, RotateCcw } from "lucide-react";

interface SomethingWentWrongProps {
  onRetry?: () => void;
}

export function SomethingWentWrong({ onRetry }: SomethingWentWrongProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <div className="rounded-full bg-red-100 p-5">
        <TriangleAlert className="h-12 w-12 text-red-500" />
      </div>

      <h2 className="mt-6 text-2xl font-bold text-slate-800">
        Something went wrong
      </h2>

      <p className="mt-2 max-w-md text-slate-500">
        Something went wrong while processing your request. Please try logging
        in again. If the problem persists, contact your administrator for
        assistance.
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-6 flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-2.5 font-medium text-white transition hover:bg-violet-700"
        >
          <RotateCcw className="h-4 w-4" />
          Try Again
        </button>
      )}
    </div>
  );
}
