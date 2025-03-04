import { db } from "../db/drizzle";
import { columns } from "../db/schema";
import { Request, Response } from "express";
import { eq } from "drizzle-orm";

export const getColumns = async (_: Request, res: Response) => {
  try {
    const allColumns = await db.select().from(columns);
    res.json(allColumns);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getColumnById = async (req: Request, res: Response) => {
  try {
    const columnId = parseInt(req.params.id, 10);

    if (isNaN(columnId)) {
      res.status(400).json({ error: "Invalid column ID" });
      return;
    }

    const column = await db.select().from(columns).where(eq(columns.id, columnId));

    if (column.length === 0) {
      res.status(404).json({ error: "Column not found" });
      return;
    }

    res.json(column[0]);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error", details: error });
  }
};
