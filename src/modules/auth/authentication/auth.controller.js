import { HTTP_STATUS } from "../../../config/constants.js";
import catchAsync from "../../../utils/catchAsync.js";
import { createNewUser } from "./auth.service.js";

export const createUser = catchAsync(async (req, res, next) => {
  const user = await createNewUser(req.body);

  res.status(HTTP_STATUS.CREATED).json({
    status: "success",
    data: {
      user,
    },
  });
});
