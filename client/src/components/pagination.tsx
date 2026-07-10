interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-end gap-4 my-2">
      <button
        onClick={onPrevious}
        disabled={currentPage === 1}
        className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
      >
        Prev
      </button>

      <div className="rounded-md border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-700">
        {currentPage} / {totalPages}
      </div>

      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
      >
        Next
      </button>
    </div>
  );
}
