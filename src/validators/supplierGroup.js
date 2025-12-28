import { body, param } from "express-validator";

export const createSupplierGroupValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Group name is required")
    .isLength({ max: 50 })
    .withMessage("Group name max length is 50 characters"),
  body("discount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Discount must be positive"),
  body("description")
    .optional()
    .isString()
    .isLength({ max: 255 })
    .withMessage("Description max length is 255 characters"),
  body("location")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Location must be positive"),
  body("isDeleted")
    .optional()
    .isBoolean()
    .withMessage("isDeleted must be boolean"),
];

export const updateSupplierGroupValidator = [
  param("id").isMongoId().withMessage("Invalid Group ID"),
  ...createSupplierGroupValidator.map((v) => v.optional()),
];

export const supplierGroupIdValidator = [
  param("id").isMongoId().withMessage("Invalid Group ID"),
];
