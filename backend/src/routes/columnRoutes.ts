import express from "express";
import { getColumnById, getColumns } from "../controllers/columnController";

const router = express.Router();

router.get("/", getColumns);
router.get("/:id", getColumnById);

export default router;
