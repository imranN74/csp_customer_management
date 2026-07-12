import { Download } from "lucide-react";

export function DownloadTemplateButton() {
  return (
    <a
      href="/templates/customer_import_template_csp.xlsx"
      download={"customer_import_template.xlsx"}
    >
      <button
        type="button"
        className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-lg border border-violet-200 bg-violet-50 px-3 text-sm font-medium text-violet-700 transition-all duration-200 hover:bg-violet-100 hover:border-violet-300 active:scale-95"
      >
        <Download size={16} />
        <span>Template</span>
      </button>
    </a>
  );
}
