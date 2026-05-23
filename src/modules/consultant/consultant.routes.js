import express from "express";
import { createConsultant } from "./consultant.controller.js";

const consultantRoutes = express.Router();

// router.get("/consultants", getAllConsultants);

consultantRoutes.post("/", createConsultant);

export default consultantRoutes;
