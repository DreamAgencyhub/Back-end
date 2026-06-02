import { HTTP_STATUS } from "../../config/constants.js";
import {
  createNewConsultant,
  getAllConsultants,
} from "./consultant.service.js";

export const createConsultant = async (req, res) => {
  try {
    const newConsultant = await createNewConsultant(req.body);

    return res.status(HTTP_STATUS.OK).json({
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
