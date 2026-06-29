import { Router } from "express";
import { customerDataImport } from "../controller/CustomerController.js";

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

export default router;
