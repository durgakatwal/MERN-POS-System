import { NODE_ENV } from "../constants/env.js";

const errorMiddleware = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server error!";

  //duplicate key errors
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    message = `Duplicate key error: ${field}`;
    statusCode = 400;
  }

  //mongoose valdiation error
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation failed";
    const errors = Object.values(err.errors).map((error) => ({
      msg: error.message,
      param: error.path,
      location: "body",
    }));
    return res.status(statusCode).json({
      status: "error",
      message,
      errors,
    });
  }

  //Invalid MongoDB objectID
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${err.path}:$(err.value).`;
  }
  res.status(statusCode).json({
    success: false,
    message,
    stack: NODE_ENV === "development" ? err.stack : undefined,
  });
};

export default errorMiddleware;
