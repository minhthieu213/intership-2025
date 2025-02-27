import { db } from "../db/drizzle";
import { tasks } from "../db/schema";
import { eq } from "drizzle-orm";
import { Request, Response } from "express";

export const getTasks = async (_: Request, res: Response) => {
  try {
    const allTasks = await db.select().from(tasks);
    res.json(allTasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks", details: error });
  }
};

export const createTask = async (req: Request, res: Response) => {
  const { title, description, columnId } = req.body;
  const newTask = await db.insert(tasks).values({ title, description, columnId });
  res.status(201).json(newTask);
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, columnId } = req.body;
  await db.update(tasks).set({ title, description, columnId }).where(eq(tasks.id, Number(id)));
  res.json({ message: "Task updated" });
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  await db.delete(tasks).where(eq(tasks.id, Number(id)));
  res.json({ message: "Task deleted" });
};
