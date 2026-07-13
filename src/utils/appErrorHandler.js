class AppErrorHandler extends Error {
  constructor(message, statusCode, customName) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "Failed" : "Error";
    this.customName = customName ? customName : "not-defined!";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppErrorHandler;
