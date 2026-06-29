import { type Request, type Response } from "express";
import XLSX from "xlsx";
import { Customer, CustomerDetail } from "../model/customer.model.js";
import { parseExcelDate, parseBooleanValues } from "../utils/helper.js";
import mongoose from "mongoose";

export interface CustomerData {
  "CIF Number": string;
  "Account Number": string;
  Name: string;
  "Date of Birth": string;
  Age: number;
  "Mobile No": string;
  email: string;
  "Aadhaar Number": string;
  "Account Open Date": string;
  "Passbook Delivered Date": string;
  Address: string;
  PMSBY: string;
  PMJJBY: string;
  APY: string;
  Remarks: string;
}

//___________IMPORT CUSTOMER DATA____________________
export async function customerDataImport(req: Request, res: Response) {
  const userId = res.locals.userId;
  const session = await mongoose.startSession();
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

    const customerData = data.map((row) => {
      return {
        name: row.Name,
        phone: row["Mobile No"],
        email: row.email,
        accountNumber: row["Account Number"],
        cifNumber: row["CIF Number"],
        adhaarNum: row["Aadhaar Number"],
        dob: parseExcelDate(row["Date of Birth"]),
        age: row.Age,
        address: row.Address,
        createdBy: userId,
      };
    });

    session.startTransaction();

    const insertedCustomer = await Customer.insertMany(customerData, {
      session,
    });

    const customerDetailsData = insertedCustomer.map((customer, index) => {
      const row = data[index]!;

      return {
        accountOpenDate: parseExcelDate(row["Account Open Date"]),
        passbookRcvDate: parseExcelDate(row["Passbook Delivered Date"]),
        pmsby: parseBooleanValues(row.PMSBY),
        pmjjby: parseBooleanValues(row.PMJJBY),
        apy: parseBooleanValues(row.APY),
        remarks: row.Remarks,
        customerId: customer._id,
      };
    });

    const customerDetails = await CustomerDetail.insertMany(
      customerDetailsData,
      { session },
    );
    await session.commitTransaction();
    if (customerDetails.length != 0) {
      const customerCreatedCount = customerDetails.length;
      return res.status(201).json({
        success: true,
        message: `${customerCreatedCount} records inserted successfully`,
      });
    }
  } catch (error: any) {
    console.log(error);
    await session.abortTransaction();
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message:
          "A record with same Account No. or Adhaar No. found in the system or in the uploaded file!",
      });
    }
    return res.status(500).json({
      success: false,
      message: "something went wrong!",
    });
  } finally {
    session.endSession();
  }
}
