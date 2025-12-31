import express from "express";
import {
  employeeCreateValidation,
  employeeUpdateValidation,
} from "../validators/employee.js";
import { validate } from "../middlewares/validatorMiddleware.js";
import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../services/employee.js";

const router = express.Router();

router.post("/", employeeCreateValidation, validate, createEmployee);
router.get("/", getAllEmployees);
router.get("/:id", getEmployeeById);
router.put("/:id", employeeUpdateValidation, validate, updateEmployee);
router.delete("/:id", employeeUpdateValidation, validate, deleteEmployee);

export default router;
