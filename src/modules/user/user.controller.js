import { HTTP_STATUS } from "../../config/constants.js";
import catchAsync from "../../utils/catchAsync.js";
import {
  handleDeleteMe,
  handleGetUsers,
  handleUpdateMe,
} from "./user.service.js";

export const updateMe = catchAsync(async (req, res) => {
  const user = await handleUpdateMe(req.user._id, req.body);

  res.status(HTTP_STATUS.OK).json({
    status: "Success",
    data: {
      user,
    },
  });
});

export const deleteMe = catchAsync(async (req, res) => {
  await handleDeleteMe(req.user._id);

  res.status(HTTP_STATUS.OK).json({
    status: "Success",
    data: null,
  });
});

export const getUsers = catchAsync(async (req, res) => {
  const users = await handleGetUsers();

  res.status(HTTP_STATUS.OK).json({
    status: "Success",
    data: {
      users,
    },
  });
});
