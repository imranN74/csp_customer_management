import { Router } from "express";
import { customerDataImport } from "../controller/CustomerController.js";
import multer from "multer";
const uplaod = multer();

const router = Router();

router.post("/import", uplaod.single("file"), customerDataImport);

export default router;
