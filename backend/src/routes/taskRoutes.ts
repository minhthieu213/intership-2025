import express from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  updateTaskOrder,
} from "../controllers/taskController";

const router = express.Router();

router.get("/", getTasks);
router.post("/", createTask);
router.put("/update/:id", updateTask);
router.delete("/update/:id", deleteTask);
router.put("/order", updateTaskOrder);

export default router;
