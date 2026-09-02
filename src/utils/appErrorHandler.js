class AppErrorHandler extends Error {
  constructor(message, statusCode, errCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "Failed" : "Error";
    this.errCode = errCode ? errCode : "not-defined!";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppErrorHandler;
