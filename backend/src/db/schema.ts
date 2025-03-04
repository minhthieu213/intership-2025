import { mysqlTable, int, varchar } from "drizzle-orm/mysql-core";

export const columns = mysqlTable("columns", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
});

export const tasks = mysqlTable("tasks", {
  id: int("id").primaryKey().autoincrement(), 
  title: varchar("title", { length: 255 }).notNull(),
  description: varchar("description", { length: 500 }),
  columnId: int("columnId").notNull().references(() => columns.id), 
});
