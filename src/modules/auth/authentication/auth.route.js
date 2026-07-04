import express from "express";
import {
  forgotPassword,
  login,
  signup,
  resetPassword,
  updatePassword,
} from "./auth.controller.js";
import { protect } from "./auth.middleware.js";

const authRoutes = express.Router();

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.post("/forgotPassword", forgotPassword);
authRoutes.patch("/resetPassword/:token", resetPassword);
authRoutes.patch("/updatePassword", protect, updatePassword);

export default authRoutes;
