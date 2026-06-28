import express from "express";
import { forgotPassword, login, signup } from "./auth.controller.js";

const authRoutes = express.Router();

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.post("/forgotPassword", forgotPassword);

export default authRoutes;
