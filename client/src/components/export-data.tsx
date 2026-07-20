import axios from "axios";
import toast from "react-hot-toast";
import { FileSpreadsheet } from "lucide-react";

export function ExportData() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  async function handleDownloadReport() {
    const toastId = toast.loading("Downloading customer data!");
    try {
      const response = await axios.get(`${baseUrl}/customer/download`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(response.data);

      const a = document.createElement("a");
      a.href = url;
      a.download = "customers.xlsx";

      document.body.appendChild(a);
      a.click();

      a.remove();
      window.URL.revokeObjectURL(url);
      toast.success("report downloaded successfully", { id: toastId });
    } catch (error: any) {
      toast.error(error.response.data.message, { id: toastId });
    }
  }

  return (
    <button
      onClick={handleDownloadReport}
      className="group inline-flex items-center gap-1 rounded-sm bg-emerald-600 px-2 text-sm font-medium text-white shadow transition-all hover:bg-emerald-700 hover:shadow-lg active:scale-95 cursor-pointer"
    >
      <FileSpreadsheet
        size={20}
        className="transition-transform group-hover:scale-110"
      />
      Export
    </button>
  );
}
