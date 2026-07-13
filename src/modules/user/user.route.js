import express from "express";
import { deleteMe, getUsers, updateMe } from "./user.controller.js";
import { protect, restrictTo } from "../auth/authentication/auth.middleware.js";

export const userRoutes = express.Router();

userRoutes.patch("/profile/updateMe", protect, updateMe);
userRoutes.delete("/profile/deleteMe", protect, deleteMe);

userRoutes.get("/", protect, restrictTo("admin"), getUsers);
