import express from "express";
import {
  createConsultant,
  getConsultants,
  updateConsultant,
  getConsultant,
  deleteConsultant,
} from "./consultant.controller.js";

const consultantRoutes = express.Router();

consultantRoutes.get("/", getConsultants);
consultantRoutes.post("/", createConsultant);
consultantRoutes.get("/:id", getConsultant);
consultantRoutes.patch("/:id", updateConsultant);
consultantRoutes.delete("/:id", deleteConsultant);

export default consultantRoutes;
