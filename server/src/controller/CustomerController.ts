import { type Request, type Response } from "express";
import XLSX from "xlsx";
import { Customer, CustomerDetail } from "../model/customer.model.js";
import {
  parseExcelDate,
  parseBooleanValues,
  vlidataData,
} from "../utils/helper.js";
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
        name: vlidataData(row.Name),
        phone: vlidataData(row["Mobile No"]),
        email: vlidataData(row.email),
        accountNumber: vlidataData(row["Account Number"]),
        cifNumber: vlidataData(row["CIF Number"]),
        adhaarNum: vlidataData(row["Aadhaar Number"]),
        dob: parseExcelDate(row["Date of Birth"]),
        age: row.Age,
        address: vlidataData(row.Address),
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
        remarks: vlidataData(row.Remarks),
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

//________GET CUSTOMER DATA______________

export async function getCustomerData(req: Request, res: Response) {
  const { page, limit, q, scheme } = req.query;

  try {
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 20;
    const search = q?.toString() || "";
    const schemeFilter = scheme?.toString() || "";

    const skip = (pageNumber - 1) * limitNumber;

    const filter: any = {
      "customer.isActive": true,
    };

    //_________GETTING CUSTOMER BASED ON USER SEARCH______________
    if (q) {
      filter.$or = [
        { "customer.accountNumber": search },
        { "customer.phone": search },
        { "customer.adhaarNum": search },
        { "customer.name": { $regex: search, $options: "i" } },
      ];
    }

    //___SCHEME FILTER_________
    if (schemeFilter) {
      filter[schemeFilter] = true;
    }

    const customerData = await CustomerDetail.aggregate([
      {
        $lookup: {
          from: "customers",
          localField: "customerId",
          foreignField: "_id",
          as: "customer",
        },
      },
      { $unwind: "$customer" },
      { $match: filter },
      { $sort: { createdAt: -1 } },
      { $skip: skip },
      { $limit: limitNumber },
      {
        $project: {
          accountOpenDate: 1,
          passbookRcvDate: 1,
          pmsby: 1,
          apy: 1,
          pmjjby: 1,
          remarks: 1,

          "customer._id": 1,
          "customer.name": 1,
          "customer.phone": 1,
          "customer.accountNumber": 1,
          "customer.adhaarNum": 1,
          "customer.cifNumber": 1,
          "customer.address": 1,
          "customer.isOperational": 1,
        },
      },
    ]);

    const customerDataCount = await CustomerDetail.aggregate([
      {
        $lookup: {
          from: "customers",
          localField: "customerId",
          foreignField: "_id",
          as: "customer",
        },
      },
      { $unwind: "$customer" },
      { $match: filter },
      { $count: "total" },
    ]);

    const totalPage = Math.ceil(
      (customerDataCount[0]?.total ?? 0) / limitNumber,
    );

    const data = {
      data: customerData,
      currentPage: pageNumber,
      limit: limitNumber,
      totalPage: totalPage,
    };

    return res.status(200).json({
      success: true,
      message: "customer data fetched successfully",
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "something went wrong!",
    });
  }
}

//________UPDATE CUSTOMER DATA________

export async function updateCustomer(req: Request, res: Response) {
  let {
    name,
    phone,
    accountNumber,
    adhaarNum,
    address,
    accountOpenDate,
    passbookRcvDate,
    pmsby,
    apy,
    pmjjby,
    remarks,
    isOperational,
    cifNumber,
  } = req.body;

  const customerId = req.params.id!;
  const session = await mongoose.startSession();

  try {
    if (!name) {
      return res.status(401).json({
        success: false,
        message: "name cannot be blank!",
      });
    }

    !accountNumber
      ? (accountNumber = undefined)
      : (accountNumber = accountNumber.trim());
    !adhaarNum ? (adhaarNum = undefined) : (adhaarNum = adhaarNum.trim());
    cifNumber ? (cifNumber = cifNumber.trim()) : (cifNumber = "");

    session.startTransaction();
    await Customer.findByIdAndUpdate(
      {
        _id: customerId,
      },
      {
        name: name.trim(),
        phone: phone.trim(),
        accountNumber: accountNumber,
        cifNumber: cifNumber,
        adhaarNum: adhaarNum,
        address: address.trim(),
        isOperational: parseBooleanValues(isOperational),
      },
      { session },
    );
    await CustomerDetail.findOneAndUpdate(
      {
        customerId,
      },
      {
        accountOpenDate: accountOpenDate,
        passbookRcvDate: passbookRcvDate,
        pmsby: pmsby ? true : false,
        pmjjby: pmjjby ? true : false,
        apy: apy ? true : false,
        remarks,
      },
      { session },
    );
    await session.commitTransaction();
    return res.status(201).json({
      success: true,
      message: "customer details updated successfully",
    });
  } catch (error: any) {
    await session.abortTransaction();
    console.log(error);
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "A record with same Account No. or Adhaar No. already exists!",
      });
    }
    return res.status(500).json({
      success: false,
      message: "somthing went wrong while updating data!",
    });
  } finally {
    session.endSession();
  }
}

//________DELETE CUSTOMER_____________-

export async function deleteCustomer(req: Request, res: Response) {
  const customerId = req.params.id!;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    await Customer.findByIdAndUpdate(
      { _id: customerId },
      { isActive: false },
      { session },
    );
    await CustomerDetail.findOneAndUpdate(
      { customerId },
      { isActive: false },
      { session },
    );
    await session.commitTransaction();
    return res.status(200).json({
      success: true,
      message: "Customer deleted successfully",
    });
  } catch (error) {
    await session.abortTransaction();
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "something went wrong!",
    });
  } finally {
    session.endSession();
  }
}

//____CREATE CUSTOMER BY FORM__________________
export async function createCustomer(req: Request, res: Response) {
  let {
    name,
    phone,
    email,
    accountNumber,
    adhaarNum,
    address,
    age,
    dob,
    cifNumber,
    accountOpenDate,
    passbookRcvDate,
    pmsby,
    apy,
    pmjjby,
    remarks,
  } = req.body;
  const data = req.body;

  const userId = res.locals.userId;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    if (!name) {
      return res.status(406).json({
        success: false,
        message: "name is required!",
      });
    }

    !accountNumber
      ? (accountNumber = undefined)
      : (accountNumber = accountNumber.trim());
    !adhaarNum ? (adhaarNum = undefined) : (adhaarNum = adhaarNum.trim());
    !pmsby ? (pmsby = false) : (pmsby = true);
    !pmjjby ? (pmjjby = false) : (pmjjby = true);
    !apy ? (apy = false) : (apy = true);

    const customer = await Customer.create(
      [
        {
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          accountNumber: accountNumber,
          adhaarNum: adhaarNum,
          age,
          dob,
          cifNumber: cifNumber.trim(),
          address: address.trim(),
          createdBy: userId,
        },
      ],
      { session },
    );

    await CustomerDetail.create(
      [
        {
          accountOpenDate,
          passbookRcvDate,
          pmsby,
          apy,
          pmjjby,
          remarks: remarks.trim(),
          customerId: customer[0]!._id,
        },
      ],
      { session },
    );

    await session.commitTransaction();

    return res.status(201).json({
      success: false,
      message: "customer created successfully",
    });
  } catch (error: any) {
    await session.abortTransaction();
    console.log(error);
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "A record with same Account No. or Adhaar No. already exists!",
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

//_______DOWNLOAD CUSTOMER EXCEL DATA________________

export async function downloadExcel(req: Request, res: Response) {
  try {
    const workbook = XLSX.utils.book_new();
    const data = await CustomerDetail.aggregate([
      {
        $lookup: {
          from: "customers",
          localField: "customerId",
          foreignField: "_id",
          as: "customer",
        },
      },
      { $unwind: "$customer" },
      { $match: { isActive: true } },
      { $sort: { createdAt: -1 } },
      {
        $project: {
          pmsby: 1,
          apy: 1,
          pmjjby: 1,

          "customer.name": 1,
          "customer.phone": 1,
          "customer.email": 1,
          "customer.accountNumber": 1,
          "customer.cifNumber": 1,
          "customer.adhaarNum": 1,
          "customer.address": 1,
          "customer.isOperational": 1,
        },
      },
    ]);

    const customer = data.map((d) => {
      return {
        name: d.customer.name,
        phone: d.customer.phone,
        email: d.customer.email,
        accountNo: d.customer.accountNumber,
        cif: d.customer.cifNumber,
        adhaarNo: d.customer.adhaarNum,
        address: d.customer.address,
        operational: d.customer.isOperational ? "Yes" : "No",
        pmsby: d.pmsby ? "Yes" : "No",
        pmjjby: d.pmjjby ? "Yes" : "No",
        apy: d.apy ? "Yes" : "No",
      };
    });

    const customerSheet = XLSX.utils.json_to_sheet(customer);
    XLSX.utils.book_append_sheet(workbook, customerSheet, "Customers");
    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

    res.setHeader(
      "Content-Disposition",
      'attchement;filename:"customers.xlsx"',
    );

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );

    res.send(buffer);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "something went wrong!" });
  }
}
