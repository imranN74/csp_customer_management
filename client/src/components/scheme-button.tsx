import { PiggyBank, HeartHandshake, ShieldCheck } from "lucide-react";

export function PMJJBY() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-semibold text-blue-700">
      <HeartHandshake className="h-3 w-3" />
      PMJJBY
    </span>
  );
}

export function PMSBY() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-700">
      <ShieldCheck className="h-3 w-3" />
      PMSBY
    </span>
  );
}

export function APY() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-semibold text-purple-700">
      <PiggyBank className="h-3 w-3" />
      APY
    </span>
  );
}
