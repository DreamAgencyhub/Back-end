import express from "express";
import {
  forgotPassword,
  login,
  signup,
  resetPassword,
  updatePassword,
} from "./auth.controller.js";
import { protect } from "./auth.middleware.js";
import rateLimit from "express-rate-limit";

const authRoutes = express.Router();

const rateLimiter = rateLimit({
  max: 10,
  windowMs: 60 * 60 * 1000,
  message: "Too many login attempts from this IP, please try again in an hour!",
});

authRoutes.post("/signup", rateLimiter, signup);
authRoutes.post("/login", rateLimiter, login);
authRoutes.post("/forgotPassword", rateLimiter, forgotPassword);
authRoutes.patch("/resetPassword/:token", resetPassword);
authRoutes.patch("/updateMyPassword", protect, updatePassword);

export default authRoutes;
