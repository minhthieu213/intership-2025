import { db } from "../db/drizzle";
import { columns } from "../db/schema";
import { eq } from "drizzle-orm";
import { Request, Response } from "express";

export const getColumns = async (_: Request, res: Response) => {
  try {
    const allColumns = await db
      .select()
      .from(columns)
      .orderBy(columns.orderColumns);

    if (allColumns.length === 0) {
      return res
        .status(200)
        .json({ success: true, data: [], message: "No columns found" });
    }
    res.status(200).json({
      success: true,
      data: allColumns,
      message: "Columns retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch columns",
      details: error,
    });
  }
};

export const getColumnById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const columnId = Number(id);
    if (isNaN(columnId) || columnId <= 0) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid column ID" });
    }

    const [column] = await db
      .select()
      .from(columns)
      .where(eq(columns.id, columnId));

    if (!column) {
      return res
        .status(404)
        .json({ success: false, error: "Column not found" });
    }

    res.status(200).json({
      success: true,
      data: column,
      message: "Column retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch column",
      details: error,
    });
  }
};

export const updateColumnOrder = async (req: Request, res: Response) => {
  try {
    const { columnOrder } = req.body;

    if (!Array.isArray(columnOrder)) {
      return res.status(400).json({
        success: false,
        error: "Column order must be an array",
      });
    }

    // Cập nhật orderColumns cho từng column
    await Promise.all(
      columnOrder.map(async (columnId, index) => {
        await db
          .update(columns)
          .set({ orderColumns: index })
          .where(eq(columns.id, columnId));
      })
    );

    // Fetch và trả về danh sách columns đã được cập nhật
    const updatedColumns = await db
      .select()
      .from(columns)
      .orderBy(columns.orderColumns);

    res.status(200).json({
      success: true,
      data: updatedColumns,
      message: "Column order updated successfully",
    });
  } catch (error) {
    console.error("Error updating column order:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update column order",
      details: error,
    });
  }
};
