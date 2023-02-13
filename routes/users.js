import express from "express";
const router = express.Router();
import { login, signup } from "../controller/users.js";
router.post("/signin", login);
router.post("/singup", signup);

export default router;
