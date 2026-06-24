import { HTTP_STATUS } from "../config/constants.js";
import AppErrorHandler from "../utils/appErrorHandler.js";

const handleInvalidIDErrorDB = (err) => {
  const message = `The /${err.value}/ is not valid! Path: ${err.path} , value: ${err.value} `;

  return new AppErrorHandler(message, 400);
};

const convertObjectToString = (obj) => {
  for (const [key, value] of Object.entries(obj)) {
    return `${key}: ${value}`;
  }
};

const handleDuplicateFiledValueErrorDB = (err) => {
  const res = convertObjectToString(err.keyValue);

  const message = `Duplicate filed value / ${res} /, Please enter another value! `;

  return new AppErrorHandler(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errMessages = Object.values(err.errors).map((el) => el.message);

  const message = `Validation Error : ${errMessages.join(". ")}`;

  return new AppErrorHandler(message, 400);
};

const handleJWTError = () =>
  new AppErrorHandler(
    "Invalid token. Please login again!",
    HTTP_STATUS.UNAUTHORIZED,
  );

const handleTokenExpiredError = () =>
  new AppErrorHandler(
    "Your Token has expired! Please login again.",
    HTTP_STATUS.UNAUTHORIZED,
  );

const sendDveError = (err, res) => {
  res.status(err.statusCode).json({
    statusCode: err.statusCode,
    status: err.status,
    message: err.message,
    stack: err.stack,
    err: err,
  });
};

const sendProductionError = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.err("ERROR 💥", err);

    err.status(500).json({
      status: "error",
      message: "Wooops!, something wet wrong!",
    });
  }
};

const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "Development") {
    sendDveError(err, res);
  } else if (process.env.NODE_ENV === "Production") {
    let error = { ...err };

    if (err.name === "CastError") error = handleInvalidIDErrorDB(err);
    if (err.code === 11000) error = handleDuplicateFiledValueErrorDB(err);
    if (err.name === "ValidationError") error = handleValidationErrorDB(err);
    if (err.name === "JsonWebTokenError") error = handleJWTError();
    if (err.name === "TokenExpiredError") error = handleTokenExpiredError();

    sendProductionError(error, res);
  }

  next();
};

export default errorHandler;
