import { createUser, login } from "../controller/UserController.js";
import { Router } from "express";

const router = Router();

router.post("/create", createUser);
router.post("/login", login);

export default router;
