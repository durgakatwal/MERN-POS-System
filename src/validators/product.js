import { body, param } from "express-validator";
import mongoose from "mongoose";

export const productCreateValidation = [
  body("product_name")
    .trim()
    .notEmpty()
    .withMessage("Product name is required")
    .isLength({ max: 100 }),

  body("product_category")
    .notEmpty()
    .withMessage("Product category is required")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid product category id"),

  body("wareHouse")
    .notEmpty()
    .withMessage("Warehouse is required")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid warehouse id"),

  body("product_price")
    .isNumeric()
    .withMessage("Product price must be a number"),

  body("fproduct_price")
    .isNumeric()
    .withMessage("Final product price must be a number"),

  body("qty")
    .isInt({ min: 0 })
    .withMessage("Quantity must be a positive number"),
];

export const productUpdateValidation = [
  param("id")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid product ID"),

  body("product_name").optional().trim(),
  body("product_price").optional().isNumeric(),
  body("qty").optional().isInt({ min: 0 }),
];

export const mongoIdParamValidator = [
  param("id")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid ID format"),
];
