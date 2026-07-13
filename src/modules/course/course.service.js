import { HTTP_STATUS } from "../../config/constants.js";
import AppErrorHandler from "../../utils/appErrorHandler.js";
import catchAsync from "../../utils/catchAsync.js";
import Course from "./course.model.js";

export const createCourse = async (courseData) => {
  const result = await Course.create({ ...courseData });

  return result;
};

export const getCourses = async () => {
  const result = await Course.find();

  return result;
};

export const getCourseById = async (id) => {
  const result = await Course.findById(id);

  return result;
};

export const updateCourseById = catchAsync(async (id, data) => {
  if (!id || !data)
    throw new AppErrorHandler(
      "There is no Id or new data to update!",
      HTTP_STATUS.BAD_REQUEST,
    );

  const course = await Course.findById(id);

  if (!course)
    throw new AppErrorHandler("The course not found!", HTTP_STATUS.NOT_FOUND);

  const result = await Course.findByIdAndUpdate(
    id,
    { ...data },
    { new: true, runValidators: true },
  );

  return result;
});

export const deleteCourseById = async (id) => {
  const result = await Course.findByIdAndDelete(id);

  return result;
};
