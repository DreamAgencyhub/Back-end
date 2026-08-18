import express from "express";
import {
  forgotPassword,
  login,
  signup,
  resetPassword,
  updatePassword,
  // getMe,
} from "./auth.controller.js";
import { protect } from "./auth.middleware.js";
import rateLimit from "express-rate-limit";
import { ERROR_CODE } from "../../../config/constants.js";

const authRoutes = express.Router();

const rateLimiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many login attempts from this IP, please try again in an hour!",
});

authRoutes.post("/signup", rateLimiter, signup);
authRoutes.post("/login", rateLimiter, login);
authRoutes.post("/forgotPassword", rateLimiter, forgotPassword);
authRoutes.patch("/resetPassword/:token", resetPassword);
authRoutes.patch("/updateMyPassword", protect, updatePassword);
// authRoutes.get("/getMe", protect, getMe);

export default authRoutes;
