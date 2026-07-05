import { HTTP_STATUS } from "../../config/constants.js";
import AppErrorHandler from "../../utils/appErrorHandler.js";
import { filterObjFields } from "../../utils/filterObjFields.js";
import User from "./user.model.js";

export const handleUpdateMe = async (userId, updateData) => {
  if (updateData.currentPassword || updateData.newPassword)
    throw new AppErrorHandler(
      "This route is not for password updates. please send request to /updateMyPassword route",
      HTTP_STATUS.BAD_REQUEST,
      "UPDATE_PASSWORD_ERROR",
    );

  const filteredData = filterObjFields(
    updateData,
    "fullName",
    "email",
    "avatar",
  );

  const user = await User.findByIdAndUpdate(userId, filteredData, {
    new: true,
    runValidators: true,
  });

  return user;
};

export const handleDeleteMe = async (userId) => {
  const result = await User.findByIdAndUpdate(userId, { active: false });
  return result;
};
