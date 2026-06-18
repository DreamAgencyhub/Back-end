import { HTTP_STATUS } from "../../config/constants.js";
import catchAsync from "../../utils/catchAsync.js";
import {
  createNewConsultant,
  getAllConsultants,
  getConsultantById,
  updateConsultantById,
} from "./consultant.service.js";

export const createConsultant = catchAsync(async (req, res) => {
  const newConsultant = await createNewConsultant(req.body);

  return res.status(HTTP_STATUS.CREATED).json({
    status: "success",
    data: {
      newConsultant,
    },
  });
});

export const getConsultants = catchAsync(async (req, res) => {
  const consultants = await getAllConsultants();

  res.status(HTTP_STATUS.OK).json({
    status: "success",
    data: { consultants },
  });
});

export const getConsultant = catchAsync(async (req, res) => {
  const consultant = await getConsultantById(req.params.id);

  res.status(HTTP_STATUS.OK).json({
    status: "success",
    data: { consultant },
  });
});

export const updateConsultant = catchAsync(async (req, res) => {
  const updatedConsultant = await updateConsultantById(req.params.id, req.body);

  res.status(HTTP_STATUS.OK).json({
    status: "success",
    data: { updatedConsultant },
  });
});

export const deleteConsultant = catchAsync(async (req, res) => {
  await deleteConsultantById(req.params.id);

  res.status(HTTP_STATUS.OK).json({
    status: "success",
    message: "Consultant deleted successfully",
  });
});
