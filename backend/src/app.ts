import express from "express";
import columnRoutes from "./routes/columnRoutes";

const app = express();
app.use(express.json()); // Important: Make sure this is added
app.use("/columns", columnRoutes);
