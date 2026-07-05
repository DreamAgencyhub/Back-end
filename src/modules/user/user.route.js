import express from "express";
import { deleteMe, updateMe } from "./user.controller.js";
import { protect } from "../auth/authentication/auth.middleware.js";

export const userRoutes = express.Router();

userRoutes.patch("/updateMe", protect, updateMe);
userRoutes.delete("/deleteMe", protect, deleteMe);
