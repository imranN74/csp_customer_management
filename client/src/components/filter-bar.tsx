import { FunnelX, Search, X } from "lucide-react";
import { useRef, useState } from "react";
import { ShieldCheck, HeartHandshake, PiggyBank } from "lucide-react";
// import { ExportData } from "./export-data";

interface Filter {
  onSearch: (value: string) => void;
  onScheme: (value: string) => void;
}

export function Filter({ onSearch, onScheme }: Filter) {
  const timeoutRef = useRef<number | null>(null);

  const [, setSearchValue] = useState("");
  const [spin, setSpin] = useState(false);

  //________Download Excel__________

  function handleSearchSet(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    onScheme("");

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      onSearch(value);
    }, 300);
  }

  return (
    <div className="flex justify-between py-2 mx-2">
      <form className="group relative flex h-10 w-52 items-center rounded-full px-1 transition-all duration-500 focus-within:rounded-sm border border-gray-400">
        <input
          title="Search by name, account no, adhaar no, mobile no"
          type="text"
          placeholder="Search by name, account no, adhaar no...."
          className="peer h-full w-full bg-transparent px-2 text-sm outline-none placeholder:text-gray-400"
          onChange={(e) => {
            setSearchValue(e.target.value);
            handleSearchSet(e);
          }}
        />

        <Search className="h-4 w-4" strokeWidth={2} color="gray" />

        <button
          title="reset"
          type="reset"
          className="invisible text-[#8b8ba7] opacity-0 transition-all duration-200 peer-not-placeholder-shown:visible peer-not-placeholder-shown:opacity-100"
          onClick={() => {
            onSearch("");
            setSearchValue("");
          }}
        >
          <X className="h-4 w-4" strokeWidth={2} />
        </button>

        {/* Animated Bottom Border */}
        <span className="absolute bottom-0 left-0 h-0.5 w-full origin-center scale-x-0 bg-blue-600 transition-transform duration-300 group-focus-within:scale-x-100"></span>
      </form>

      <div className="flex gap-1 h-7">
        <button
          type="button"
          className="flex gap-2 items-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-blue-100  hover:text-heading focus:bg-violet-500 focus:border-3 shadow-xs font-medium leading-5 rounded-base text-sm px-2 focus:outline-none border-blue-400 rounded-lg cursor-pointer text-blue-400"
          onClick={() => {
            onScheme("pmsby");
          }}
        >
          <ShieldCheck size={20} />
          PMSBY
        </button>
        <button
          type="button"
          className="flex gap-2 items-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-orange-100 hover:text-heading focus:bg-violet-500 focus:border-3 shadow-xs font-medium leading-5 rounded-base text-sm px-2 py-2.5 focus:outline-none border-orange-400 text-orange-400 rounded-lg cursor-pointer"
          onClick={() => {
            onScheme("pmjjby");
          }}
        >
          <HeartHandshake size={20} />
          PMJJBY
        </button>
        <button
          type="button"
          className="flex gap-2 items-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-green-100 hover:text-heading focus:bg-violet-500 focus:border-3 shadow-xs font-medium leading-5 rounded-base text-sm px-2 py-2.5 focus:outline-none border-green-400 text-green-400 rounded-lg cursor-pointer"
          onClick={() => {
            onScheme("apy");
          }}
        >
          <PiggyBank size={20} />
          APY
        </button>
        <button
          type="button"
          title="Clear Filters"
          onClick={() => {
            onScheme("");
            onSearch("");
            setSpin(true);

            setTimeout(() => {
              setSpin(false);
            }, 1000);
          }}
          className="group flex cursor-pointer items-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 shadow-sm transition-all duration-200 hover:border-red-300 hover:bg-red-50 hover:shadow-md active:scale-95"
        >
          <FunnelX
            size={18}
            className={`transition-transform duration-700 ${
              spin ? "rotate-180" : ""
            } group-hover:scale-110`}
          />
        </button>
        {/* <ExportData /> */}
      </div>
    </div>
  );
}
