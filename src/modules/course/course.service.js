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

export const updateCourseById = async (id, data) => {
  const result = Course.findByIdAndUpdate(id, { ...data });

  return result;
};

export const deleteCourseById = async (id) => {
  const result = await Course.findByIdAndDelete(id);

  return result;
};
