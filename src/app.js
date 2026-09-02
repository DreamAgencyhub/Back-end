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
import authRoutes from "./modules/auth/authentication/auth.route.js";
import { userRoutes } from "./modules/user/user.route.js";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import mongoSanitization from "express-mongo-sanitize";
import xss from "xss-clean";
import hpp from "hpp";
import cookieParser from "cookie-parser";

const app = express();

const globalRateLimiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});

// Middleware
app.use(helmet());
app.use("/api", globalRateLimiter);
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitization());
app.use(xss());
app.use(cookieParser());

app.use(
  hpp({
    whitelist: [""],
  }),
);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "Server is running" });
});

// API Routes
// app.use(`${process.env.API_PREFIX}/user`, userRoutes);
app.use(`${process.env.API_PREFIX}/consultant`, consultantRoutes);
app.use(`${process.env.API_PREFIX}/course`, courseRoutes);
app.use(`${process.env.API_PREFIX}/auth`, authRoutes);
app.use(`${process.env.API_PREFIX}/user`, userRoutes);

// 404 handler
app.use((req, res, next) => {
  next(new AppErrorHandler(`The route ${req.originalUrl} was not found!`, 404));
});

// Error handling middleware
app.use(errorHandler);

export default app;
