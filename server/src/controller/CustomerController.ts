import { type Request, type Response } from "express";
import XLSX from "xlsx";
import { Customer, CustomerDetail } from "../model/customer.model.js";
import { parseExcelDate, parseBooleanValues } from "../utils/validateDate.js";

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
    // console.log(sheet);
    // return;

    const data = XLSX.utils.sheet_to_json<CustomerData>(sheet);
    // console.log(data);
    // return;

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
        createdBy: "6a3d48a67be832f9e3ba3cd7",
      };
    });

    const insertedCustomer = await Customer.insertMany(customerData);

    const customerDetailsData = insertedCustomer.map((customer, index) => {
      if (!data[index]) {
        return res.status(400).json({
          success: false,
          message: `No data found for the customer index ${index}`,
        });
      }

      // console.log(
      //   "pass date.......",
      //   parseExcelDate(data[index]["Passbook Delivered Date"]),
      // );
      // console.log(
      //   "acc date.......",
      //   parseExcelDate(data[index]["Account Open Date"]),
      // );
      // return;

      return {
        accountOpenDate: parseExcelDate(data[index]["Passbook Delivered Date"]),
        passbookRcvDate: parseExcelDate(data[index]["Account Open Date"]),
        pmsby: parseBooleanValues(data[index].PMSBY),
        pmjjby: parseBooleanValues(data[index].PMJJBY),
        apy: parseBooleanValues(data[index].APY),
        remarks: data[index].Remarks,
        customerId: customer._id,
      };
    });

    const customerDetails =
      await CustomerDetail.insertMany(customerDetailsData);
    if (customerDetails.length != 0) {
      const customerCreatedCount = customerDetails.length;
      res.status(201).json({
        success: true,
        message: `${customerCreatedCount} records inserted successfully`,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "something went wrong!",
    });
  }
}
