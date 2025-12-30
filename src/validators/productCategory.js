import { body, param } from "express-validator";
import mongoose from "mongoose";

export const createProductCategoryValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 100 })
    .withMessage("Title max length is 100 characters"),
  body("extra")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Extra max length is 100 characters"),
  body("parent")
    .optional({ checkFalsy: true })
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid parent id"),
  body("location")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Location must be a positive integer"),
  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean"),
  body("isDeleted")
    .optional()
    .isBoolean()
    .withMessage("isDeleted must be a boolean"),
];

export const updateProductCategoryValidation = [
  body("title")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Title max length is 100 characters"),
  body("extra")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Extra max length is 100 characters"),
  body("parent")
    .optional({ checkFalsy: true })
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid parent id"),
  body("location")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Location must be a positive integer"),
  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean"),
  body("isDeleted")
    .optional()
    .isBoolean()
    .withMessage("isDeleted must be a boolean"),
];

export const productCategoryByIdValidation = [
  param("id")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid product category id"),
];
