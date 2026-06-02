import { HTTP_STATUS } from "../../config/constants.js";
import {
  createNewConsultant,
  getAllConsultants,
  getConsultantById,
  updateConsultantById,
} from "./consultant.service.js";

export const createConsultant = async (req, res) => {
  try {
    const newConsultant = await createNewConsultant(req.body);

    return res.status(HTTP_STATUS.CREATED).json({
      status: "success",
      data: {
        newConsultant,
      },
    });
  } catch (error) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      status: "failed",
      message: error.message,
      error: error,
    });
  }
};

export const getConsultants = async (req, res) => {
  try {
    const consultants = await getAllConsultants();

    res.status(HTTP_STATUS.OK).json({
      status: "success",
      data: { consultants },
    });
  } catch (err) {
    res.status(HTTP_STATUS.NOT_FOUND).json({
      status: "failed",
      message: err.message,
    });
  }
};

export const getConsultant = async (req, res) => {
  try {
    const consultant = await getConsultantById(req.params.id);

    res.status(HTTP_STATUS.OK).json({
      status: "success",
      data: { consultant },
    });
  } catch (err) {
    res.status(HTTP_STATUS.NOT_FOUND).json({
      status: "failed",
      message: err.message,
    });
  }
};

export const updateConsultant = async (req, res) => {
  try {
    const updatedConsultant = await updateConsultantById(
      req.params.id,
      req.body,
    );

    res.status(HTTP_STATUS.OK).json({
      status: "success",
      data: { updatedConsultant },
    });
  } catch (err) {
    res.status(HTTP_STATUS.NOT_FOUND).json({
      status: "failed",
      message: err.message,
    });
  }
};

export const deleteConsultant = async (req, res) => {
  try {
    await deleteConsultantById(req.params.id);

    res.status(HTTP_STATUS.OK).json({
      status: "success",
      message: "Consultant deleted successfully",
    });
  } catch (err) {
    res.status(HTTP_STATUS.NOT_FOUND).json({
      status: "failed",
      message: err.message,
    });
  }
};
