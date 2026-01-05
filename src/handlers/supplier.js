import express from "express";
import {
  supplierCreateValidation,
  supplierIdParamValidator,
  supplierUpdateValidator,
} from "../validators/supplier.js";
import { validate } from "../middlewares/validatorMiddleware.js";
import {
  createSupplier,
  deleteSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
} from "../services/supplier.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { checkPermission } from "../middlewares/permissionMiddleware.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  checkPermission("supplier", "create"),
  supplierCreateValidation,
  validate,
  createSupplier
);
router.get(
  "/",
  authMiddleware,
  checkPermission("supplier", "read"),
  getAllSuppliers
);
router.get(
  "/:id",
  authMiddleware,
  checkPermission("supplier", "read"),
  supplierIdParamValidator,
  validate,
  getSupplierById
);
router.put(
  "/:id",
  authMiddleware,
  checkPermission("supplier", "update"),
  supplierUpdateValidator,
  validate,
  updateSupplier
);
router.delete(
  "/:id",
  authMiddleware,
  checkPermission("supplier", "delete"),
  supplierIdParamValidator,
  validate,
  deleteSupplier
);

export default router;
