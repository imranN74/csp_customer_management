export function Loader() {
  return (
    <div className="flex items-center justify-center bg-slate-50 mt-15">
      <div className="flex items-center gap-3 px-6 py-4">
        <div className="h-3 w-3 animate-pulse rounded-full bg-emerald-500" />
        <span className="text-sm font-medium text-slate-600">
          Loading data...
        </span>
      </div>
    </div>
  );
}
