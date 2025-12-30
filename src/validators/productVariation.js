import { body, param } from "express-validator";
import mongoose from "mongoose";

export const createProductVariationValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Product variation name is required")
    .isLength({ max: 100 })
    .withMessage("Product variation name must be at most 100 characters long"),
];

export const updateProductVariationValidator = [
  param("id")
    .custom((id) => mongoose.Types.ObjectId.isValid(id))
    .withMessage("Invalid product variation id"),
];
