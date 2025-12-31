import { body, param } from "express-validator";
import mongoose from "mongoose";

export const createRoleValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Role name is required")
    .isLength({ max: 100 })
    .withMessage("Role name must be less than 100 characters"),

  body("permissions")
    .isArray({ min: 1 })
    .withMessage("Permissions must be an array"),
];

export const roleIdValidation = [
  param("id")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid role id"),
];

export const updateRoleValidation = [
  param("id")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid role id"),
];

export const permissionIdValidation = [
  param("id")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid permission id"),
];
