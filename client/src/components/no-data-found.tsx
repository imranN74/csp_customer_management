import { SearchX } from "lucide-react";

export function NoDataFound({
  message = "No data found",
}: {
  message?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="mb-4 rounded-full bg-slate-100 p-4">
        <SearchX className="h-10 w-10 text-slate-500" />
      </div>

      <h2 className="text-lg font-semibold text-slate-800">{message}</h2>

      <p className="mt-2 max-w-sm text-sm text-slate-500">
        We couldn't find any records matching your search or filter. Try
        changing the search term or clearing the filters.
      </p>
    </div>
  );
}
