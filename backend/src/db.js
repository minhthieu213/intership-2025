import { db } from './path/to/your/db'; 
import { columns, tasks } from './path/to/your/schema'; 

async function seedDatabase() {
  try {

    const column1 = await db.insert(columns).values({ name: "Todo" });
    const column2 = await db.insert(columns).values({ name: "In Progress" });
    const column3 = await db.insert(columns).values({ name: "Done" });

    console.log("Inserted columns:", column1, column2, column3);

    await db.insert(tasks).values({
      title: "Task 1",
      description: "Description for Task 1",
      columnId: column1.insertId, 
    });

    await db.insert(tasks).values({
      title: "Task 2",
      description: "Description for Task 2",
      columnId: column2.insertId,
    });

    await db.insert(tasks).values({
      title: "Task 3",
      description: "Description for Task 3",
      columnId: column3.insertId,
    });

    console.log("Tasks inserted successfully.");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    db.destroy();
  }
}

seedDatabase();