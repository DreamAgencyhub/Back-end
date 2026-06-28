import { HTTP_STATUS } from "../../../config/constants.js";
import AppErrorHandler from "../../../utils/appErrorHandler.js";
import User from "../../user/user.model.js";
import { signToken } from "./auth.utils.js";

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

export const handleForgotPassword = async (email) => {
  // 1. find user by email
  const user = await User.findOne({ email });

  if (!user)
    throw new AppErrorHandler(
      "The user not found!",
      HTTP_STATUS.NOT_FOUND,
      "FORGOT_PASSWORD_ERROR",
    );

  // 2. create random token
  const restToken = user.createPasswordResetToken();

  // 3. save random token in db
  user.save({ validateBeforeSave: false });

  // 4. send token to user's email
  return restToken;
};
