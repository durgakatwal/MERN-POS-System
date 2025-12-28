import { body, param } from "express-validator";
import mongoose from "mongoose";

const phoneRegex = /^[0-9+\-() ]{7,20}$/;

export const supplierCreateValidation = [
  body("name")
    .notEmpty()
    .withMessage("Supplier Name is required")
    .isLength({ max: 50 })
    .withMessage("Supplier Name max length is 50 characters"),

  body("phone")
    .notEmpty()
    .withMessage("Phone is required")
    .matches(phoneRegex)
    .withMessage("Invalid phone number"),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email")
    .normalizeEmail(),

  body("discount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Discount must be positive"),

  body("balance")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Balance must be positive"),
];

export const supplierUpdateValidator = [
  param("id").isMongoId().withMessage("Invalid supplier id"),
  ...supplierCreateValidation,
];

export const supplierIdParamValidator = [
  param("id").isMongoId().withMessage("Invalid supplier id"),
];
