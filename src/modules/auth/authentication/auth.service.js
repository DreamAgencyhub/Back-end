import { ERROR_CODE, HTTP_STATUS } from "../../../config/constants.js";
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

  const { token, cookieOptions } = createSendToken({ id: _id });

  return {
    token,
    cookieOptions,
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

  const { token, cookieOptions } = createSendToken({ id: user._id });

  return {
    token,
    cookieOptions,
    user: {
      fullName: user.fullName,
      email: user.email,
      _id: user._id,
      role: user.role,
      avatar: user.avatar,
    },
  };
};

export const handleForgotPassword = async ({ protocol, host, email }) => {
  const user = await User.findOne({ email });

  if (!user)
    throw new AppErrorHandler(
      "The user not found!",
      HTTP_STATUS.NOT_FOUND,
      ERROR_CODE.FORGOT_PASSWORD_ERROR,
    );

  const resetToken = user.createPasswordResetToken();

  user.save({ validateBeforeSave: false });

  // const resetURL = `${protocol}://${host}/api/v1/auth/resetPassword/${restToken}`;
  const resetURL = `${protocol}://localhost:3000/auth/reset-password/${resetToken}`;

  const message = ` 
    <h2>Password Reset</h2>

    <p>Click the button below to reset your password:</p>

    <a href="${resetURL}">
      Reset Password
    </a>   
    
    <h6>If you didn't forget your password, please ignore this email!</h6>

    `;

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

export const handleResetPassword = async ({ password, resetToken }) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

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

  const { token, cookieOptions } = createSendToken({ id: user._id });

  return { token, cookieOptions };
};

export const handleUpdatePassword = async (
  userId,
  { currentPassword, newPassword },
) => {
  const user = await User.findById(userId).select("+password");

  if (!user)
    throw new AppErrorHandler("User not found!", HTTP_STATUS.NOT_FOUND);

  if (!(await user.isPasswordCorrect(currentPassword, user.password)))
    throw new AppErrorHandler(
      "Current password is incorrect!",
      HTTP_STATUS.UNAUTHORIZED,
    );

  user.password = newPassword;
  await user.save();

  const { token, cookieOptions } = createSendToken({ id: user._id });

  return { token, cookieOptions };
};

const createSendToken = ({ id }) => {
  const token = signToken({ id });

  const cookieOptions = {
    expires: Date.now() + process.env.JWT_TOKEN_EXPIRES_IN * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "lax",
  };

  if (process.env.NODE_ENV === "Production") cookieOptions.secure = true;

  return { token, cookieOptions };
};
