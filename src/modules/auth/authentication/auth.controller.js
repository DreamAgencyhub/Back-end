import { HTTP_STATUS } from "../../../config/constants.js";
import AppErrorHandler from "../../../utils/appErrorHandler.js";
import catchAsync from "../../../utils/catchAsync.js";
import {
  createNewUser,
  handleForgotPassword,
  handleResetPassword,
  handleUpdatePassword,
  loginUser,
} from "./auth.service.js";

export const signup = catchAsync(async (req, res) => {
  const user = await createNewUser(req.body);

  res.status(HTTP_STATUS.CREATED).json({
    status: "success",
    data: {
      ...user,
    },
  });
});

export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const { token, cookieOptions } = await loginUser({ email, password });

  res.cookie("jwt", token, cookieOptions);

  res.status(HTTP_STATUS.OK).json({
    status: "Success",
    data: {
      token,
    },
  });
});

export const forgotPassword = catchAsync(async (req, res) => {
  const options = {
    email: req.body.email,
    protocol: req.protocol,
    host: req.get("host"),
  };

  await handleForgotPassword(options);

  res.status(HTTP_STATUS.OK).json({
    status: "Success",
    data: {
      message: "Token sent to email! ",
    },
  });
});

export const resetPassword = catchAsync(async (req, res) => {
  const params = {
    resetToken: req.params.token,
    password: req.body.password,
  };

  const { token, cookieOptions } = await handleResetPassword(params);

  res.cookie("jwt", token, cookieOptions);

  res.status(HTTP_STATUS.OK).json({
    status: "Success",
    data: {
      token,
    },
  });
});

export const updatePassword = catchAsync(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user._id;

  const { token, cookieOptions } = await handleUpdatePassword(userId, {
    currentPassword,
    newPassword,
  });

  res.cookie("jwt", token, cookieOptions);

  res.status(HTTP_STATUS.OK).json({
    status: "success",
    data: {
      token,
    },
  });
});
