import express from "express";
import {
  createSupplierGroupValidator,
  supplierGroupIdValidator,
  updateSupplierGroupValidator,
} from "../validators/supplierGroup.js";
import { validate } from "../middlewares/validatorMiddleware.js";
import {
  createSupplierGroup,
  deleteSupplierGroup,
  getAllSuppliersGroup,
  getSupplierGroupById,
  updateSupplierGroup,
} from "../services/supplierGroup.js";

const router = express.Router();

router.post("/", createSupplierGroupValidator, validate, createSupplierGroup);
router.get("/", getAllSuppliersGroup);
router.get("/:id", supplierGroupIdValidator, validate, getSupplierGroupById);
router.put("/:id", updateSupplierGroupValidator, validate, updateSupplierGroup);
router.delete("/:id", supplierGroupIdValidator, validate, deleteSupplierGroup);

export default router;
