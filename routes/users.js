import express from "express";
const router = express.Router();
import { login, signup } from "../controller/users.js";
router.post("/signin", login);
router.post("/signup", signup);

export default router;
