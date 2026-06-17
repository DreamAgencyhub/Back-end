import { HTTP_STATUS, MESSAGES } from "../../config/constants.js";
import {
  createCourse,
  deleteCourseById,
  getCourseById,
  getCourses,
  updateCourseById,
} from "./course.service.js";

export const createNewCourse = async (req, res) => {
  try {
    const newCourse = await createCourse(req.body);

    res.status(HTTP_STATUS.CREATED).json({
      status: "SUCCESS",
      data: {
        newCourse,
      },
    });
  } catch (err) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      status: "FAILED",
      message: err.message,
    });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const courses = await getCourses();

    res.status(HTTP_STATUS.OK).json({
      status: "SUCCESS",
      result: courses.length,
      data: {
        courses,
      },
    });
  } catch (err) {
    res.status(HTTP_STATUS.NOT_FOUND).json({
      status: "FAILED",
      message: err.message,
    });
  }
};

export const getCourse = async (req, res) => {
  try {
    const course = await getCourseById(req.params.id);

    res.status(HTTP_STATUS.OK).json({
      status: "SUCCESS",
      data: {
        course,
      },
    });
  } catch (err) {
    res.status(HTTP_STATUS.NOT_FOUND).json({
      status: "FAILED",
      message: err.message,
    });
  }
};

export const updateCourse = async (req, res) => {
  const { id } = req.params;
  const newData = req.body;

  try {
    const updatedCourse = await updateCourseById(id);

    res.status(HTTP_STATUS.OK).json({
      status: "SUCCESS",
      data: {
        updatedCourse,
      },
    });
  } catch (err) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      status: "FAILED",
      message: err.message,
    });
  }
};

export const deleteCourse = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteCourseById(id);

    res.status(HTTP_STATUS.OK).json({
      status: "SUCCESS",
      data: null,
    });
  } catch (err) {
    res.status(HTTP_STATUS.NOT_FOUND).json({
      status: "FAILED",
      message: err.message,
    });
  }
};
