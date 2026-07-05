import express from "express";
import { updateMe } from "./user.controller.js";
import { protect } from "../auth/authentication/auth.middleware.js";

export const userRoutes = express.Router();

userRoutes.patch("/updateMe", protect, updateMe);
