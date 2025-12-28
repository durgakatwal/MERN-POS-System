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

const router = express.Router();

router.post("/", supplierCreateValidation, validate, createSupplier);
router.get("/", getAllSuppliers);
router.get("/:id", supplierIdParamValidator, validate, getSupplierById);
router.put("/:id", supplierUpdateValidator, validate, updateSupplier);
router.delete("/:id", supplierIdParamValidator, validate, deleteSupplier);

export default router;
