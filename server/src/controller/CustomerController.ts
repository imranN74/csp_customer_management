import { type Request, type Response } from "express";
import XLSX from "xlsx";

interface CustomerData {
  name: string;
  sem: number;
  program: string;
  School: string;
  courseCode: string;
  exam_session: string;
}

export async function customerDataImport(req: Request, res: Response) {
  //   res.send("testsss");
  //   return;
  if (!req.file) {
    return res.status(404).json({
      success: false,
      message: "file is required!",
    });
  }
  const buffer = req.file.buffer;
  const workbook = XLSX.read(buffer);
  if (!workbook.SheetNames[0]) {
    return;
  }
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  if (!sheet) {
    return;
  }
  const data = XLSX.utils.sheet_to_json<CustomerData>(sheet);
  if (!data) {
    return;
  }

  data.map((d) => {
    console.log(d.School);
  });

  console.log("dataaaaaaaaa", data);
  return;
}
