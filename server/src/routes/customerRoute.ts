import { Router } from "express";
import {
  customerDataImport,
  getCustomerData,
  updateCustomer,
  deleteCustomer,
} from "../controller/CustomerController.js";

import multer from "multer";
import { authenticateUser, authorizeUser } from "../middleware/auth.js";
const uplaod = multer();

const router = Router();

router.post(
  "/import",
  authenticateUser,
  authorizeUser,
  uplaod.single("file"),
  customerDataImport,
);

router.get("/", authenticateUser, authorizeUser, getCustomerData);
router.put("/update/:id", updateCustomer);
router.delete("/:id", deleteCustomer);

export default router;
