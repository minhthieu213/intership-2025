import { db } from "../db/drizzle";
import { tasks } from "../db/schema";
import { eq } from "drizzle-orm";
import { Request, Response } from "express";

export const getTasks = async (_: Request, res: Response) => {
  try {
    const allTasks = await db.select().from(tasks);
    if (allTasks.length === 0) {
      return res
        .status(200)
        .json({ success: true, data: [], message: "No tasks found" });
    }
    res.status(200).json({
      success: true,
      data: allTasks,
      message: "Tasks retrieved successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch tasks", details: error });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, columnId } = req.body;

    if (!title || !columnId) {
      return res
        .status(400)
        .json({ success: false, error: "Title and columnId are required" });
    }

    const result = await db
      .insert(tasks)
      .values({ title, description, columnId });
    const taskId = result[0].insertId;

    const [newTask] = await db.select().from(tasks).where(eq(tasks.id, taskId));

    res.status(201).json({
      success: true,
      data: newTask,
      message: "Task created successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Failed to create task", details: error });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, columnId } = req.body;

    const taskId = Number(id);
    if (isNaN(taskId) || taskId <= 0) {
      return res.status(400).json({ success: false, error: "Invalid task ID" });
    }

    if (!title || !columnId) {
      return res
        .status(400)
        .json({ success: false, error: "Title and columnId are required" });
    }

    const [existingTask] = await db
      .select()
      .from(tasks)
      .where(eq(tasks.id, taskId));
    if (!existingTask) {
      return res.status(404).json({ success: false, error: "Task not found" });
    }

    await db
      .update(tasks)
      .set({ title, description, columnId })
      .where(eq(tasks.id, taskId));

    const [updatedTask] = await db
      .select()
      .from(tasks)
      .where(eq(tasks.id, taskId));

    res
      .status(200)
      .json({ success: true, data: updatedTask, message: "Task updated" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Failed to update task", details: error });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const taskId = Number(id);
    if (isNaN(taskId) || taskId <= 0) {
      return res.status(400).json({ success: false, error: "Invalid task ID" });
    }

    const [existingTask] = await db
      .select()
      .from(tasks)
      .where(eq(tasks.id, taskId));
    if (!existingTask) {
      return res.status(404).json({ success: false, error: "Task not found" });
    }

    await db.delete(tasks).where(eq(tasks.id, taskId));

    res
      .status(200)
      .json({ success: true, data: existingTask, message: "Task deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Failed to delete task", details: error });
  }
};

export const updateTaskOrder = async (req: Request, res: Response) => {
  try {
    const { tasks: updatedTasks } = req.body;
    console.log("test: ", tasks)
    // Kiểm tra dữ liệu đầu vào
    if (!Array.isArray(updatedTasks)) {
      return res
        .status(400)
        .json({ success: false, error: "Tasks should be an array" });
    }

    for (const task of updatedTasks) {
      if (!task.id || typeof task.orderTask !== "number") {
        return res.status(400).json({
          success: false,
          error: "Each task must have a valid id and order (number)",
        });
      }
    }

    // Thực hiện transaction
    await db.transaction(async (tx) => {
      await Promise.all(
        updatedTasks.map((task) =>
          tx
            .update(tasks)
            .set({ orderTask: task.orderTask })
            .where(eq(tasks.id, task.id))
        )
      );
    });

    res
      .status(200)
      .json({ success: true, message: "Task order updated successfully" });
  } catch (error) {
    console.error("Error updating task order:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
