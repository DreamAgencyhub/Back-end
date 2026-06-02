import Consultant from "./consultant.model.js";

export const createNewConsultant = async function (data) {
  if (!data) throw new Error("Data is required to create a consultant");

  const consultant = await Consultant.create({ ...data });

  return consultant;
};

export const getAllConsultants = async function () {
  const consultants = await Consultant.find();

  return consultants;
};
