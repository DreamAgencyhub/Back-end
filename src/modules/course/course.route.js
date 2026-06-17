import express from "express";
import {
  createNewCourse,
  deleteCourse,
  getAllCourses,
  getCourse,
  updateCourse,
} from "./course.controller.js";

const courseRoutes = express.Router();

courseRoutes.route("/").get(getAllCourses).post(createNewCourse);

courseRoutes
  .route("/:id")
  .get(getCourse)
  .patch(updateCourse)
  .delete(deleteCourse);

export default courseRoutes;
