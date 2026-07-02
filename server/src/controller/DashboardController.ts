import { type Request, type Response } from "express";
import { CustomerDetail, Customer } from "../model/customer.model.js";

export async function dashboardData(req: Request, res: Response) {
  try {
    const totalCustomer = await Customer.countDocuments({ isActive: true });
    const pastWeekDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const pastMonthDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const currentWeekCount = await Customer.countDocuments({
      createdAt: { $gte: pastWeekDate },
    });

    const currentMonthCount = await Customer.countDocuments({
      createdAt: { $gte: pastMonthDate },
    });

    const pmsbyEnrolledCount = await CustomerDetail.countDocuments({
      pmsby: true,
    });

    const pmjjbyEnrolledCount = await CustomerDetail.countDocuments({
      pmjjby: true,
    });

    const apyEnrolledCount = await CustomerDetail.countDocuments({
      apy: true,
    });

    const totalSchemeCount =
      apyEnrolledCount + pmjjbyEnrolledCount + pmsbyEnrolledCount;

    const data = {
      totalCustomer: totalCustomer,
      currentWeekCount: currentWeekCount,
      currentMonthCount: currentMonthCount,
      pmsbyEnrolledCount: pmsbyEnrolledCount,
      pmjjbyEnrolledCount: pmjjbyEnrolledCount,
      apyEnrolledCount: apyEnrolledCount,
      totalSchemeCount: totalSchemeCount,
    };

    return res.status(200).json({
      success: true,
      message: "data fetched successfully",
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
