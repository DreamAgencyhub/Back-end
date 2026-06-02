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

export const getConsultantById = async function (id) {
  const consultant = await Consultant.findById(id);

  return consultant;
};

export const deleteConsultantById = async function (id) {
  const result = await Consultant.findByIdAndDelete(id);

  return result;
};

export const updateConsultantById = async function (id, data) {
  const updatedConsultant = await Consultant.findByIdAndUpdate(
    id,
    { ...data },
    { new: true },
  );

  return updatedConsultant;
};
