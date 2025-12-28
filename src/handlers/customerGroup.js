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

const router = express.Router();

router.post("/", createCustomerGroupValidator, validate, createCustomerGroup);
router.get("/", getAllCustomersGroups);
router.get("/:id", customerGroupIdValidator, validate, getCustomerGroupById);
router.put("/:id", updateCustomerGroupValidator, validate, updateCustomerGroup);
router.delete("/:id", customerGroupIdValidator, validate, deleteCustomerGroup);

export default router;
