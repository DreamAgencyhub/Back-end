import jwt from "jsonwebtoken";

export const signToken = (payload) =>
  jwt.sign(
    {
      ...payload,
    },
    process.env.MY_JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRY,
    },
  );
