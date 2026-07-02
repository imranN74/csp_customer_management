import userRouter from "./userRoute.js";
import customerRouter from "./customerRoute.js";
import { Router } from "express";
import dashboardRouter from "./dashboardRoute.js";

const router = Router();

router.use("/user", userRouter);
router.use("/customer", customerRouter);
router.use("/dashboard", dashboardRouter);
export default router;
