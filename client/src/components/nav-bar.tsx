import { LogoutButton } from "./logout";
import { Plus, Upload } from "lucide-react";
import { ImportDialog } from "./import-dialog";
import { useState } from "react";
import { Link } from "react-router-dom";

export function Navbar() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  return (
    <div className="flex gap-5 items-center">
      <div>
        <LogoutButton />
      </div>
      <div>
        <button
          onClick={() => setOpenDialog(!openDialog)}
          type="button"
          className="relative overflow-hidden rounded-xl bg-[#66ff66] px-6 py-2.5 text-[17px] font-bold tracking-[0.05rem] text-[ghostwhite] cursor-pointer
  before:absolute before:top-0 before:left-[-10%] before:h-full before:w-[120%] before:skew-x-[-30deg] before:bg-violet-500 before:content-['']
  before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.3,1,0.8,1)]
  hover:before:translate-x-full
  [&>span]:relative [&>span]:z-10 [&>span]:flex [&>span]:items-center [&>span]:gap-1
  [&>span]:transition-colors [&>span]:duration-300 hover:[&>span]:text-black"
        >
          <span>
            <Upload className="h-4 w-4" />
            Import
          </span>
        </button>
      </div>
      <div>
        <Link to="/create">
          <button
            type="button"
            className="flex h-10 cursor-pointer items-center gap-2 rounded-lg bg-violet-600  px-4 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-md active:scale-[0.98]"
          >
            <Plus size={18} strokeWidth={2.5} />
            <span>Create New</span>
          </button>
        </Link>
      </div>
      <ImportDialog open={openDialog} setOpen={setOpenDialog} />
    </div>
  );
}
