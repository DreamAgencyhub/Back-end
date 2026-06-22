import express from "express";
import { createUser } from "./auth.controller.js";

const authRoutes = express.Router();

authRoutes.post("/signup", createUser);

export default authRoutes;
