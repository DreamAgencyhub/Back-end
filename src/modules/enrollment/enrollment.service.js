import Enrollment from "./enrollment.model.js";
import Course from "../course/course.model.js";
import User from "../user/user.model.js";

export const createNewEnrollment = async (courseId, userId) => {
  const course = await Course.findById(courseId);
  const user = await User.findById(userId);
  const existingEnrollment = await Enrollment.findOne({
    user: userId,
    course: courseId,
  });

  if (!course || !user) throw new Error("Invalid user or course id!");

  if (!course.isPublished) throw new Error(`This course hasn't published yet!`);

  if (existingEnrollment) throw new Error("Already Enrolled!");

  const enrollment = await Enrollment.create({
    user: userId,
    course: courseId,
  });

  return enrollment;
};
