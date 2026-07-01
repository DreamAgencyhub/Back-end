import express from "express";
import {
  forgotPassword,
  login,
  signup,
  resetPassword,
} from "./auth.controller.js";

const authRoutes = express.Router();

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.post("/forgotPassword", forgotPassword);
authRoutes.patch("/resetPassword/:token", resetPassword);

export default authRoutes;
