import { HTTP_STATUS, MESSAGES } from "../../config/constants.js";
import {
  createCourse,
  deleteCourseById,
  getCourseById,
  getCourses,
  updateCourseById,
} from "./course.service.js";
import catchAsync from "../../utils/catchAsync.js";
import AppErrorHandler from "../../utils/appErrorHandler.js";

export const createNewCourse = catchAsync(async (req, res) => {
  const newCourse = await createCourse(req.body);

  res.status(HTTP_STATUS.CREATED).json({
    status: "SUCCESS",
    data: {
      newCourse,
    },
  });
});

export const getAllCourses = catchAsync(async (req, res) => {
  const courses = await getCourses();

  res.status(HTTP_STATUS.OK).json({
    status: "SUCCESS",
    result: courses.length,
    data: {
      courses,
    },
  });
});

export const getCourse = catchAsync(async (req, res) => {
  const course = await getCourseById(req.params.id);

  res.status(HTTP_STATUS.OK).json({
    status: "SUCCESS",
    data: {``
      course,
    },
  });
});

export const updateCourse = catchAsync(async (req, res) => {
  const { id } = req.params;

  if (!id || !req.body)
    throw new AppErrorHandler(
      "There is no Id or new data to update!",
      HTTP_STATUS.BAD_REQUEST,
    );

  const updatedCourse = await updateCourseById(id, req.body);

  res.status(HTTP_STATUS.OK).json({
    status: "SUCCESS",
    data: {
      updatedCourse,
    },
  });
});

export const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params;

  await deleteCourseById(id);

  res.status(HTTP_STATUS.OK).json({
    status: "SUCCESS",
    data: null,
  });
});
