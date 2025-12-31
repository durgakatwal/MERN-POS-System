import express from "express";
import {
  createRoleValidation,
  roleIdValidation,
  updateRoleValidation,
} from "../validators/role.js";
import { validate } from "../middlewares/validatorMiddleware.js";
import {
  createRole,
  deleteRole,
  getAllRoles,
  getRolesById,
  updateRole,
} from "../services/role.js";

const router = express.Router();

router.post("/", createRoleValidation, validate, createRole);
router.get("/", getAllRoles);
router.get("/:id", roleIdValidation, validate, getRolesById);
router.put("/:id", updateRoleValidation, validate, updateRole);
router.delete("/:id", roleIdValidation, validate, deleteRole);

export default router;
