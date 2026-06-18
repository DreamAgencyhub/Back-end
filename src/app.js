import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { connectDB } from "./config/database.js";
// import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import consultantRoutes from "./modules/consultant/consultant.routes.js";
import courseRoutes from "./modules/course/course.route.js";
import AppErrorHandler from "./utils/appErrorHandler.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "Server is running" });
});

// API Routes
// app.use(`${process.env.API_PREFIX}/user`, userRoutes);
app.use(`${process.env.API_PREFIX}/consultant`, consultantRoutes);
app.use(`${process.env.API_PREFIX}/course`, courseRoutes);

// 404 handler
app.use((req, res, next) => {
  console.log(
    "THSIIIIIIIIIIIIIIIIIIIIIII",
    new AppErrorHandler(`The route ${req.originalUrl} was not found!`, 404),
  );
  next(new AppErrorHandler(`The route ${req.originalUrl} was not found!`, 404));
});

// Error handling middleware
app.use(errorHandler);

export default app;
