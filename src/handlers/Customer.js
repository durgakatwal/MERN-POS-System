import express from "express";
import {
  createCustomer,
  deleteCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
} from "../services/Customer.js";
import {
  customerCreateValidation,
  customerUpdateValidation,
} from "../validators/Customer.js";
import { validate } from "../middlewares/validatorMiddleware.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { checkPermission } from "../middlewares/permissionMiddleware.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  checkPermission("customer", "create"),
  customerCreateValidation,
  validate,
  createCustomer
);
router.get(
  "/",
  authMiddleware,
  checkPermission("customer", "read"),
  getAllCustomers
);
router.get(
  "/:id",
  authMiddleware,
  checkPermission("customer", "read"),
  getCustomerById
);
router.put(
  "/:id",
  authMiddleware,
  checkPermission("customer", "update"),
  customerUpdateValidation,
  validate,
  updateCustomer
);
router.delete(
  "/:id",
  authMiddleware,
  checkPermission("customer", "delete"),
  deleteCustomer
);

export default router;
