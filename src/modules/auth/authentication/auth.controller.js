import { HTTP_STATUS } from "../../../config/constants.js";
import AppErrorHandler from "../../../utils/appErrorHandler.js";
import catchAsync from "../../../utils/catchAsync.js";
import {
  createNewUser,
  handleForgotPassword,
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

  const token = await loginUser({ email, password });

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
  console.log(req.params, req.body);

  res.status(HTTP_STATUS.OK).json({
    status: "Success",
  });
});
