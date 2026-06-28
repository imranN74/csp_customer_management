import { type Request, type Response } from "express";
import { cpSync } from "node:fs";
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
  try {
    if (!req.file) {
      return res.status(404).json({
        success: false,
        message: "file is required!",
      });
    }
    const buffer = req.file.buffer;
    const workbook = XLSX.read(buffer);

    const firstSheet = workbook.SheetNames[0];

    if (!firstSheet) {
      return res.status(400).json({
        success: false,
        message: "sheet not found in the file!",
      });
    }

    const sheet = workbook.Sheets[firstSheet];
    if (!sheet) {
      return res.status(400).json({
        success: false,
        message: "data not found in the uploaded file!",
      });
    }

    const data = XLSX.utils.sheet_to_json<CustomerData>(sheet);

    console.log(data);
    //___DATA INSERT INTO DB________
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "something went wrong!",
    });
  }
}
