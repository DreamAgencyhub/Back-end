import { createNewConsultant } from "./consultant.service.js";

export const createConsultant = async (req, res) => {
  try {
    const newConsultant = await createNewConsultant(req.body);

    return res.status(201).json({
      status: "success",
      data: {
        newConsultant,
      },
    });
  } catch (error) {
    return res.status(400).json({
      status: "failed",
      message: error.message,
      error: error,
    });
  }
};
