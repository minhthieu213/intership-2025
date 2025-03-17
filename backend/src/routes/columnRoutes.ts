import express from "express";
import {
  getColumnById,
  getColumns,
  updateColumnOrder,
} from "../controllers/columnController";

const router = express.Router();

router.get("/", getColumns);
router.get("/:id", getColumnById);
router.put("/order", updateColumnOrder);

export default router;
