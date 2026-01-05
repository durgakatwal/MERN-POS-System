import { validate } from "../middlewares/validatorMiddleware.js";
import express from "express";
import {
  createCustomerGroup,
  deleteCustomerGroup,
  getAllCustomersGroups,
  getCustomerGroupById,
  updateCustomerGroup,
} from "../services/customerGroup.js";
import {
  createCustomerGroupValidator,
  customerGroupIdValidator,
  updateCustomerGroupValidator,
} from "../validators/CustomerGroup.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { checkPermission } from "../middlewares/permissionMiddleware.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  checkPermission("customerGroup", "create"),
  createCustomerGroupValidator,
  validate,
  createCustomerGroup
);
router.get(
  "/",
  authMiddleware,
  checkPermission("customerGroup", "read"),
  getAllCustomersGroups
);
router.get(
  "/:id",
  authMiddleware,
  checkPermission("customerGroup", "read"),
  customerGroupIdValidator,
  validate,
  getCustomerGroupById
);
router.put(
  "/:id",
  authMiddleware,
  checkPermission("customerGroup", "update"),
  updateCustomerGroupValidator,
  validate,
  updateCustomerGroup
);
router.delete(
  "/:id",
  authMiddleware,
  checkPermission("customerGroup", "delete"),
  customerGroupIdValidator,
  validate,
  deleteCustomerGroup
);

export default router;
