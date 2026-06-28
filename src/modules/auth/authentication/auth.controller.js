import { HTTP_STATUS } from "../../../config/constants.js";
import AppErrorHandler from "../../../utils/appErrorHandler.js";
import catchAsync from "../../../utils/catchAsync.js";
import {
  createNewUser,
  handleForgotPassword,
  loginUser,
} from "./auth.service.js";

export const signup = catchAsync(async (req, res, next) => {
  const user = await createNewUser(req.body);

  res.status(HTTP_STATUS.CREATED).json({
    status: "success",
    data: {
      ...user,
    },
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const token = await loginUser({ email, password });

  res.status(HTTP_STATUS.OK).json({
    status: "Success",
    data: {
      token,
    },
  });
});

export const forgotPassword = catchAsync(async (req, res, next) => {
  const passwordResetToken = await handleForgotPassword(req.body.email);

  res.status(HTTP_STATUS.OK).json({
    status: "Success",
    data: {
      passwordResetToken,
    },
  });
});
