import Consultant from "./consultant.model.js";

export const createNewConsultant = async function (data) {
  if (!data) throw new Error("Data is required to create a consultant");

  console.log("Check Instance:", await Consultant.create());
  const consultant = await Consultant.create({ ...data });

  return consultant;
};
