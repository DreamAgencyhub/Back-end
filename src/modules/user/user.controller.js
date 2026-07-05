import { HTTP_STATUS } from "../../config/constants.js";
import catchAsync from "../../utils/catchAsync.js";
import { handleUpdateMe } from "./user.service.js";

export const updateMe = catchAsync(async (req, res) => {
  const user = await handleUpdateMe(req.user._id, req.body);

  res.status(HTTP_STATUS.OK).json({
    status: "Success",
    data: {
      user,
    },
  });
});
