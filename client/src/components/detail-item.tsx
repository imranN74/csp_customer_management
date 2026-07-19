interface DetailItemProps {
  label: string;
  value: React.ReactNode;
}

export function DetailItem({ label, value }: DetailItemProps) {
  return (
    <div className="flex items-start border-b last:border-b-0">
      <p className="w-40 shrink-0 font-medium text-slate-500">{label}</p>

      <div className="flex-1 wrap-break-words text-slate-900">{value}</div>
    </div>
  );
}
