import express from "express";
import {
  createNewCourse,
  deleteCourse,
  getAllCourses,
  getCourse,
  updateCourse,
} from "./course.controller.js";
import { protect } from "../auth/authentication/auth.middleware.js";

const courseRoutes = express.Router();

courseRoutes.route("/").get(getAllCourses).post(createNewCourse);

courseRoutes
  .route("/:id")
  .get(getCourse)
  .patch(protect, updateCourse)
  .delete(deleteCourse);

export default courseRoutes;
