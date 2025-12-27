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

const router = express.Router();

router.post("/", customerCreateValidation, validate, createCustomer);
router.get("/", getAllCustomers);
router.get("/:id", getCustomerById);
router.put("/:id", customerUpdateValidation, validate, updateCustomer);
router.delete("/:id", deleteCustomer);

export default router;
