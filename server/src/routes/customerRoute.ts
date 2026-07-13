import { Router } from "express";
import {
  customerDataImport,
  getCustomerData,
  updateCustomer,
  deleteCustomer,
  createCustomer,
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
router.put("/update/:id", authenticateUser, authorizeUser, updateCustomer);
router.delete("/:id", authenticateUser, authorizeUser, deleteCustomer);
router.post("/create", authenticateUser, authorizeUser, createCustomer);

export default router;
