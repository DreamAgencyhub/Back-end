import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { connectDB } from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import consultantRoutes from "./modules/consultant/consultant.routes.js";

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "Server is running" });
});

// API Routes
app.use(`${process.env.API_PREFIX}/user`, userRoutes);
app.use(`${process.env.API_PREFIX}/consultant`, consultantRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error handling middleware
app.use(errorHandler);

export default app;
