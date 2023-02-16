import express from "express";
import {
  checkStatement,
  createTransection,
  deleteTransection,
  getSingleTransSection,
  getTransections,
  updateTransection,
} from "../controller/transections.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.get("/", auth, getTransections);
router.post("/", auth, createTransection);
router.post("/singleTransection/:id", auth, getSingleTransSection);
router.patch("/:id", auth, updateTransection);
router.post("/checkStatement", auth, checkStatement);
router.delete("/:id", auth, deleteTransection);

export default router;
