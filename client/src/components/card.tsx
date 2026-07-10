import { type ReactNode } from "react";

interface CardProps {
  icon: ReactNode;
  title: string;
  value: number | string;
  bgColor?: string;
}

export function Card({ icon, title, value, bgColor }: CardProps) {
  return (
    <div
      className={`group min-w-62.5 rounded-2xl border border-slate-200 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl ${bgColor}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            {value}
          </h2>
        </div>

        <div className="rounded-2xl bg-violet-100 p-3 text-violet-600 transition-colors duration-300 group-hover:bg-violet-600 group-hover:text-white">
          {icon}
        </div>
      </div>

      <div className="mt-6 h-px bg-slate-100" />

      <p className="mt-4 text-sm text-slate-500">Updated just now</p>
    </div>
  );
}
