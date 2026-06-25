import userRouter from "./userRoute.js";
import { Router } from "express";

const router = Router();

router.use("/user", userRouter);
export default router;
