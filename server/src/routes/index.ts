import userRouter from "./userRoute.js";
import customerRouter from "./customerRoute.js";
import { Router } from "express";

const router = Router();

router.use("/user", userRouter);
router.use("/customer", customerRouter);
export default router;
