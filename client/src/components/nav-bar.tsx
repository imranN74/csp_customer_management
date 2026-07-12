import { Upload, UploadCloud } from "lucide-react";
import { LogoutButton } from "./logout";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";
import { useAuthStore } from "@/store/AuthStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { DownloadTemplateButton } from "./donwload-button";
import toast from "react-hot-toast";
import axios from "axios";

export function Navbar() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const token = useAuthStore((state) => state.token);

  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [laoding, setLoading] = useState<Boolean>(false);

  async function handleImport(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const file = formData.get("file") as File;
    try {
      if (!file || file.size == 0) {
        toast.error("no file selected, please select file!");
        return;
      }

      const response = await axios.post(
        `${baseUrl}/customer/import`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      toast.success(response.data.message);
      setLoading(false);
      navigate("/customer");
    } catch (error: any) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  }

  return (
    <div className="flex gap-5 items-center">
      <div>
        <LogoutButton />
      </div>
      <div>
        <Dialog>
          <DialogTrigger>
            <button
              type="button"
              className="relative overflow-hidden rounded-full bg-[#66ff66] px-6 py-3 text-[17px] font-bold tracking-[0.05rem] text-[ghostwhite] cursor-pointer
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
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <div className="flex justify-center">
                <DownloadTemplateButton />
              </div>
              <DialogDescription>
                Fields marks with <span className="text-red-500">*</span> cannot
                be blank in the excel sheet
              </DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <form onSubmit={handleImport}>
                <label
                  htmlFor="file-upload"
                  className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-violet-300 bg-violet-50 transition-all duration-200 hover:border-violet-500 hover:bg-violet-100"
                >
                  <UploadCloud className="mb-4 h-14 w-14 text-violet-600" />

                  <h3 className="text-lg font-semibold text-slate-800">
                    Upload Excel File
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    Drag & drop your file here or{" "}
                    <span className="font-semibold text-violet-600">
                      click to browse
                    </span>
                  </p>
                  <p className="text-violet-500">
                    {selectedFile ? selectedFile.name : ""}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Supports .xlsx and .xls
                  </p>

                  <input
                    id="file-upload"
                    type="file"
                    accept=".xlsx,.xls"
                    className="hidden"
                    name="file"
                    onChange={(e) => {
                      const file = e.target.files?.[0] ?? null;
                      setSelectedFile(file);
                    }}
                  />
                </label>
                <div className="flex gap-5 justify-between mt-2">
                  <DialogClose
                    render={
                      <Button
                        variant="outline"
                        className={"cusrsor-pointer cursor-pointer"}
                      >
                        Close
                      </Button>
                    }
                  />
                  <Button
                    type="submit"
                    className={
                      "bg-purple-500 hover:bg-violet-700 cursor-pointer"
                    }
                  >
                    {laoding ? "Processing data...." : "Submit"}
                  </Button>
                </div>
              </form>
            </FieldGroup>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
