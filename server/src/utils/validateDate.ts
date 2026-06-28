import XLSX from "xlsx";

export function parseExcelDate(value: any): Date | null {
  if (!value) return null;

  if (typeof value == "number") {
    const parsed = XLSX.SSF.parse_date_code(value);
    if (!parsed) return null;
    return new Date(Date.UTC(parsed.y, parsed.m - 1, parsed.d));
  }

  if (typeof value == "string") {
    const date = value.split("-").reverse().join("-");
    return new Date(date);
  }
  return null;
}

export function parseBooleanValues(value: string): boolean {
  const val = value.toLowerCase();
  if (val == "yes") {
    return true;
  }
  return false;
}
