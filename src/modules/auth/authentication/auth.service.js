import User from "../../user/user.model.js";

export const createNewUser = async (newUser) => {
  const user = await User.create({ ...newUser });

  return user;
};
