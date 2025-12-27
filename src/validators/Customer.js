//Regex pattern
const phoneRegex = /^[0-9+\-() ]{7,20}$/;
const postboxRegex = /^[0-9A-Za-z\- ]{3,20}$/;
const postalRegex = /^[0-9A-Za-z\- ]{3,20}$/;
const taxIdRegex = /^[0-9A-Za-z\-]{5,100}$/;

//validation rules for creating and updating customer
export const customerCreateValidation = () => [
  body("name")
    .trim()
    .notEmpty()
    .message("Name is required")
    .isLength({ max: 50 })
    .withMessage("Name max length is 50 characters."),
  body("company").optional({ checkFalsy: true }).trim().isLength({ max: 100 }),
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

  body("address").optional({ checkFalsy: true }).trim().isLength({ max: 100 }),
  body("city").optional({ checkFalsy: true }).trim().isLength({ max: 50 }),
  body("region").optional({ checkFalsy: true }).trim().isLength({ max: 50 }),
  body("country").optional({ checkFalsy: true }).trim().isLength({ max: 50 }),
  body("postbox")
    .optional({ checkFalsy: true })
    .matches(postboxRegex)
    .withMessage("Invalid postal code"),

  // Shipping sub-document validation
  body("shipping").optional().isObject(),
  body("shipping.name").optional().trim().isLength({ max: 50 }),
  body("shipping.phone").optional().matches(phoneRegex),
  body("shipping.address").optional().trim().isLength({ max: 100 }),
  body("shipping.city").optional().trim().isLength({ max: 50 }),
  body("shipping.region").optional().trim().isLength({ max: 50 }),
  body("shipping.country").optional().trim().isLength({ max: 50 }),
  body("shipping.postbox").optional().matches(postboxRegex),

  // Reference validation
  body("customerGroup")
    .optional({ checkFalsy: true })
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid CustomerGroup ID"),

  body("taxid").optional({ checkFalsy: true }).trim().isLength({ max: 100 }),
  body("documentId")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 255 }),

  body("discount")
    .optional({ checkFalsy: true })
    .isFloat({ min: 0 })
    .withMessage("Discount must be positive"),
  body("balance")
    .optional({ checkFalsy: true })
    .isFloat({ min: 0 })
    .withMessage("Balance must be positive"),

  body("picture")
    .optional({ checkFalsy: true })
    .isString()
    .isLength({ max: 100 }),
  body("location").optional({ checkFalsy: true }).isInt({ min: 0 }),
  body("isDeleted").optional({ checkFalsy: true }).isBoolean(),
];

// Validation rules for updating a customer (partial updates allowed)
export const customerUpdateValidation = () => [
  body("name").optional().trim().isLength({ max: 50 }),
  body("company").optional().trim().isLength({ max: 100 }),
  body("phone").optional().matches(phoneRegex),
  body("email").optional().isEmail().normalizeEmail(),
  body("address").optional().trim().isLength({ max: 100 }),
  body("city").optional().trim().isLength({ max: 50 }),
  body("region").optional().trim().isLength({ max: 50 }),
  body("country").optional().trim().isLength({ max: 50 }),
  body("postbox").optional().matches(postboxRegex),
  body("shipping").optional().isObject(),
  body("shipping.name").optional().trim().isLength({ max: 50 }),
  body("shipping.phone").optional().matches(phoneRegex),
  body("shipping.address").optional().trim().isLength({ max: 100 }),
  body("shipping.city").optional().trim().isLength({ max: 50 }),
  body("shipping.region").optional().trim().isLength({ max: 50 }),
  body("shipping.country").optional().trim().isLength({ max: 50 }),
  body("shipping.postbox").optional().matches(postboxRegex),
  body("customerGroup")
    .optional()
    .custom((value) => mongoose.Types.ObjectId.isValid(value)),
  body("taxid").optional().trim().isLength({ max: 100 }),
  body("documentId").optional().trim().isLength({ max: 255 }),
  body("discount").optional().isFloat({ min: 0 }),
  body("balance").optional().isFloat({ min: 0 }),
  body("picture").optional().trim().isLength({ max: 100 }),
  body("location").optional().isInt({ min: 0 }),
  body("isDeleted").optional().isBoolean(),
];

// Middleware to handle validation result
export const validateCustomer = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  const extractedErrors = errors
    .array()
    .map((err) => ({ [err.param]: err.msg }));
  return res.status(422).json({ errors: extractedErrors });
};
