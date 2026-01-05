import { body } from "express-validator";
import mongoose from "mongoose";

export const productStockValidation = [
  body("product")
    .optional()
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid product id"),
  body("wareHouse")
    .optional()
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid wareHouse id"),
  body("quantity")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Quantity must be positive"),
];
export const productStockUpdateValidation = [
  body("product")
    .optional()
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid product id"),
  body("wareHouse")
    .optional()
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid wareHouse id"),
  body("quantity")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Quantity must be positive"),
];
