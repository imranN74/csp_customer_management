export function ConfirmBox({
  onConfirm,
  onCancel,
}: {
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="w-[340px] rounded-xl border border-slate-200 bg-white p-5 shadow-xl">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v4m0 4h.01M5.07 19h13.86c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.34 16c-.77 1.33.19 3 1.73 3Z"
            />
          </svg>
        </div>

        <div className="flex-1">
          <h3 className="text-base font-semibold text-slate-900">
            Delete Customer?
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            This action cannot be undone. Are you sure you want to delete this
            customer?
          </p>
        </div>
      </div>

      <div className="mt-5 flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="cursor-pointer rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
        >
          Cancel
        </button>

        <button
          onClick={onConfirm}
          className="cursor-pointer rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
