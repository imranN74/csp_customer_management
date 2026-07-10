import { Search, X } from "lucide-react";
import { useRef, useState } from "react";
import {
  ShieldCheck,
  HeartHandshake,
  PiggyBank,
  RefreshCcwDot,
} from "lucide-react";

interface Filter {
  onSearch: (value: string) => void;
  onScheme: (value: string) => void;
}

export function Filter({ onSearch, onScheme }: Filter) {
  const timeoutRef = useRef<number | null>(null);

  const [, setSearchValue] = useState("");
  const [spin, setSpin] = useState(false);

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
        {/* Search Icon */}

        {/* Input */}
        <input
          type="text"
          placeholder="Search by name, account no, adhaar no...."
          className="peer h-full w-full bg-transparent px-2 text-sm outline-none placeholder:text-gray-400"
          onChange={(e) => {
            setSearchValue(e.target.value);
            handleSearchSet(e);
          }}
        />

        <Search className="h-4 w-4" strokeWidth={2} color="gray" />

        {/* Reset Button */}
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
          className="flex gap-2 items-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:bg-blue-300  focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-2 focus:outline-none border-blue-400 rounded-xl cursor-pointer"
          onClick={() => {
            onScheme("pmsby");
          }}
        >
          <ShieldCheck size={20} />
          PMSBY Only
        </button>
        <button
          type="button"
          className="flex gap-2 items-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:bg-blue-300  focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-2 py-2.5 focus:outline-none border-orange-400 rounded-xl cursor-pointer"
          onClick={() => {
            onScheme("pmjjby");
          }}
        >
          <HeartHandshake size={20} />
          PMJJBY Only
        </button>
        <button
          type="button"
          className="flex gap-2 items-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:bg-blue-300 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-2 py-2.5 focus:outline-none border-green-400 rounded-xl cursor-pointer"
          onClick={() => {
            onScheme("apy");
          }}
        >
          <PiggyBank size={20} />
          APY Only
        </button>
        <button
          type="button"
          className="flex gap-2 items-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-2 py-2 focus:outline-none border-black rounded-xl cursor-pointer"
          onClick={() => {
            onScheme("");
            onSearch("");
            setSpin(true);
            setTimeout(() => {
              setSpin(false);
            }, 1000);
          }}
        >
          <span className={`${spin ? "animate-spin" : ""}`}>
            <RefreshCcwDot size={20} />
          </span>
          Remove Filters
        </button>
      </div>
    </div>
  );
}
