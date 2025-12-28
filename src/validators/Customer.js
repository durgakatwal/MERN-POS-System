import { body, validationResult } from "express-validator";
import mongoose from "mongoose";

// Regex patterns
const phoneRegex = /^[0-9+\-() ]{7,20}$/;
const postboxRegex = /^[0-9A-Za-z\- ]{3,20}$/;

// CREATE CUSTOMER VALIDATION
export const customerCreateValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 50 })
    .withMessage("Name max length is 50 characters"),

  body("company")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 100 })
    .withMessage("Company max length is 100"),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone is required")
    .matches(phoneRegex)
    .withMessage("Invalid phone number"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email")
    .normalizeEmail(),

  body("address").optional().trim().isLength({ max: 100 }),
  body("city").optional().trim().isLength({ max: 50 }),
  body("region").optional().trim().isLength({ max: 50 }),
  body("country").optional().trim().isLength({ max: 50 }),

  body("postbox")
    .optional()
    .matches(postboxRegex)
    .withMessage("Invalid postbox"),

  // Shipping
  body("shipping").optional().isObject(),
  body("shipping.name").optional().trim().isLength({ max: 50 }),
  body("shipping.phone").optional().matches(phoneRegex),

  // References
  body("customerGroup")
    .optional()
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid customer group id"),

  body("discount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Discount must be positive"),

  body("balance")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Balance must be positive"),

  body("location").optional().isInt({ min: 0 }),
  body("isDeleted").optional().isBoolean(),
];

// UPDATE CUSTOMER VALIDATION

export const customerUpdateValidation = [
  body("name").optional().trim().isLength({ max: 50 }),
  body("company").optional().trim().isLength({ max: 100 }),
  body("phone").optional().matches(phoneRegex),
  body("email").optional().isEmail().normalizeEmail(),
];

// VALIDATION RESULT HANDLER

export const validationMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  return res.status(422).json({
    success: false,
    errors: errors.array().map((e) => ({
      field: e.param,
      message: e.msg,
    })),
  });
};
