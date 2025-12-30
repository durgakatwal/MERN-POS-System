import { body, param } from "express-validator";
import mongoose from "mongoose";

export const createProductVariationOptionValidator = [
  body("variation")
    .custom((id) => mongoose.Types.ObjectId.isValid(id))
    .withMessage("Invalid variation id"),
  body("value")
    .trim()
    .notEmpty()
    .withMessage("Value is required")
    .isLength({ max: 100 })
    .withMessage("Value max length is 100 characters"),
];

export const variationOptionByIdValidator = [
  param("id")
    .custom((id) => mongoose.Types.ObjectId.isValid(id))
    .withMessage("Invalid variation option id"),
];
