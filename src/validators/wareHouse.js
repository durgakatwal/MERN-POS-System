import { body, param } from "express-validator";
import mongoose from "mongoose";

export const wareHouseCreateValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 100 })
    .withMessage("Title max length is 100 characters"),
  body("extra")
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage("Extra max length is 255 characters"),
  body("location")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Location must be a positive integer"),
  body("isActive")
    .optional({ checkFalsy: true })
    .isBoolean()
    .withMessage("isActive must be a boolean"),
  body("isDeleted")
    .optional({ checkFalsy: true })
    .isBoolean()
    .withMessage("isDeleted must be a boolean"),
];

export const wareHouseUpdateValidation = [
  body("title")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Title max length is 100 characters"),
  body("extra")
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage("Extra max length is 255 characters"),
  body("location")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Location must be a positive integer"),
  body("isActive")
    .optional({ checkFalsy: true })
    .isBoolean()
    .withMessage("isActive must be a boolean"),
  body("isDeleted")
    .optional({ checkFalsy: true })
    .isBoolean()
    .withMessage("isDeleted must be a boolean"),
];

export const wareHouseByIdValidation = [
  param("id")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid warehouse id"),
];
