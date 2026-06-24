import { HTTP_STATUS } from "../../../config/constants.js";
import AppErrorHandler from "../../../utils/appErrorHandler.js";
import catchAsync from "../../../utils/catchAsync.js";
import { promisify } from "util";
import jwt from "jsonwebtoken";
import User from "../../user/user.model.js";

export const protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token)
    throw new AppErrorHandler(
      "You are not logged in! Please login first!",
      HTTP_STATUS.UNAUTHORIZED,
    );

  const decoded = await promisify(jwt.verify)(
    token,
    process.env.MY_JWT_SECRET_KEY,
  );

  const currentUser = await User.findById(decoded.id);

  if (!currentUser)
    throw new AppErrorHandler(
      "The user belonging to this token no longer exists!",
      HTTP_STATUS.UNAUTHORIZED,
    );

  if (currentUser.hasPasswordChangedAfterJWTIssued(decoded.iat))
    throw new AppErrorHandler(
      "User recently changed password! Please login again",
      HTTP_STATUS.UNAUTHORIZED,
    );

  req.user = currentUser;
  next();
});
