import User from "../../user/user.model.js";
import jwt from "jsonwebtoken";

export const createNewUser = async (newUser) => {
  const { fullName, email, role, _id, avatar } = await User.create({
    fullName: newUser.fullName,
    email: newUser.email,
    password: newUser.password,
    avatar: newUser.avatar,
  });

  const token = jwt.sign(
    {
      fullName,
      email,
      _id,
      role,
    },
    process.env.MY_JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRY,
    },
  );

  return {
    user: {
      fullName,
      email,
      role,
      _id,
      avatar,
    },
    token,
  };
};
