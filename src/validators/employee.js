import { body, param } from "express-validator";
import mongoose from "mongoose";
export const employeeCreateValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("username").trim().notEmpty().withMessage("Username is required"),
  body("email").trim().notEmpty().withMessage("Email is required"),
  body("password").trim().notEmpty().withMessage("Password is required"),
  body("role")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid role id"),
  body("wareHouse")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid warehouse id"),
];

export const employeeUpdateValidation = [
  param("id")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid employee id"),
];
