import { Loader2 } from "lucide-react";

interface OverlayLoaderProps {
  text?: string;
}

export function OverlayLoader({ text = "Loading..." }: OverlayLoaderProps) {
  return (
    <div className="relative inset-0 z-50 flex items-center justify-center rounded-lg bg-white/60 backdrop-blur-sm">
      <div className="flex items-center gap-3 rounded-xl border bg-white px-5 py-3 shadow-lg">
        <Loader2 className="h-5 w-5 animate-spin text-violet-600" />
        <span className="text-sm font-medium text-slate-700">{text}</span>
      </div>
    </div>
  );
}
