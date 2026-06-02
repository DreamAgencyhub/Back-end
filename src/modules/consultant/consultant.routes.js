import express from "express";
import { createConsultant, getConsultants } from "./consultant.controller.js";

const consultantRoutes = express.Router();

consultantRoutes.get("/", getConsultants);

consultantRoutes.post("/", createConsultant);

export default consultantRoutes;
