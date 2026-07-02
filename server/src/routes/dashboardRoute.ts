import { Router } from "express";
import { dashboardData } from "../controller/DashboardController.js";
import { authenticateUser, authorizeUser } from "../middleware/auth.js";

const router = Router();

router.get("/", authenticateUser, authorizeUser, dashboardData);

export default router;
