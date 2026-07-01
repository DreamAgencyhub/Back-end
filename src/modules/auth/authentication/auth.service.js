import { HTTP_STATUS } from "../../../config/constants.js";
import AppErrorHandler from "../../../utils/appErrorHandler.js";
import User from "../../user/user.model.js";
import { sendEmail, signToken } from "./auth.utils.js";
import crypto from "crypto";

export const createNewUser = async (newUser) => {
  const { fullName, email, role, _id, avatar } = await User.create({
    fullName: newUser.fullName,
    email: newUser.email,
    password: newUser.password,
    avatar: newUser.avatar,
  });

  const token = signToken({ id: _id });

  return {
    token,
    user: {
      fullName,
      email,
      role,
      _id,
      avatar,
    },
  };
};

export const loginUser = async (credentials) => {
  const { email, password } = credentials;

  if (!email || !password)
    throw new AppErrorHandler(
      "Please provide email and password!",
      HTTP_STATUS.BAD_REQUEST,
    );

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.isPasswordCorrect(password, user.password)))
    throw new AppErrorHandler(
      "Invalid email or password!",
      HTTP_STATUS.BAD_REQUEST,
    );

  const token = signToken({ id: user._id });

  return token;
};

export const handleForgotPassword = async ({ protocol, host, email }) => {
  const user = await User.findOne({ email });

  if (!user)
    throw new AppErrorHandler(
      "The user not found!",
      HTTP_STATUS.NOT_FOUND,
      "FORGOT_PASSWORD_ERROR",
    );

  const restToken = user.createPasswordResetToken();

  user.save({ validateBeforeSave: false });

  const resetURL = `${protocol}://${host}/api/v1/auth/resetPassword/${restToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password
   and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

  try {
    const result = await sendEmail({
      email: user.email,
      subject: "Your password reset token (valid for 10 min)",
      message,
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;
    await user.save({ validateBeforeSave: false });

    throw new AppErrorHandler(
      "There was an error sending the email. Try again later!",
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
    );
  }
};

export const handleResetPassword = async ({
  password,
  confirmPassword,
  token,
}) => {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetTokenExpires: { $gt: Date.now() },
  });

  if (!user)
    throw new AppErrorHandler(
      "Token is invalid or has expired!",
      HTTP_STATUS.BAD_REQUEST,
    );

  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpires = undefined;

  await user.save();

  const JWTToken = signToken({ id: user._id });

  return JWTToken;
};
