import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const signToken = (payload) =>
  jwt.sign(
    {
      ...payload,
      exp: Date.now() + process.env.JWT_TOKEN_EXPIRES_IN * 60 * 60 * 1000,
    },
    process.env.MY_JWT_SECRET_KEY,
    // {
    //   expiresIn: process.env.JWT_TOKEN_EXPIRES_IN * 60 * 1000,
    // },
  );

export const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "Dream Agency <no-reply@dream-agency.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  const result = await transporter.sendMail(mailOptions);

  return result;
};
