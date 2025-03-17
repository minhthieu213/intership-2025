import express from "express";
import columnRoutes from "./routes/columnRoutes";

const app = express();
app.use(express.json()); 
app.use("/columns", columnRoutes);
