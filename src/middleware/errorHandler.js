import AppErrorHandler from "../utils/appErrorHandler.js";

const handleInvalidIDErrorDB = (err) => {
  const message = `The /${err.value}/ is not valid! Path: ${err.path} , value: ${err.value} `;

  return new AppErrorHandler(message, 400);
};

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

    sendProductionError(error, res);
  }

  next();
};

export default errorHandler;
