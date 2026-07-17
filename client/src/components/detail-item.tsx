interface DetailItemProps {
  label: string;
  value: React.ReactNode;
}

export function DetailItem({ label, value }: DetailItemProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-slate-200 bg-linear-to-br from-slate-50 via-white to-slate-50 px-5 py-2 shadow-xs transition-all duration-300 hover:border-slate-300 hover:shadow-md hover:shadow-blue-100/20">
      <div className="relative z-10">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-600 mb-2.5 block">
          {label}
        </p>
        <div className="wrap_break-words text-sm leading-relaxed font-medium text-slate-900 mt-1">
          {value}
        </div>
      </div>
    </div>
  );
}
