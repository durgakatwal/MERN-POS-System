import ValidationError from "../errors/validation-error.js";
import { validationResult } from "express-validator";

export const validate = async (req, _, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    console.log(result.array());
    return next(new ValidationError("Validation failed", result.array()));
  }
  return next();
};
