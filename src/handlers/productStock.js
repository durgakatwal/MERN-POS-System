import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { checkPermission } from "../middlewares/permissionMiddleware.js";
import { productStockValidation } from "../validators/productStock.js";
import { validate } from "../middlewares/validatorMiddleware.js";
import {
  createProductStock,
  deleteProductStock,
  getAllProductStocks,
  getProductStockById,
  updateProductStock,
} from "../services/productStock.js";
import { productStockUpdateValidation } from "../validators/productStock.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  checkPermission("productStock", "create"),
  productStockValidation,
  validate,
  createProductStock
);
router.get(
  "/",
  authMiddleware,
  checkPermission("productStock", "read"),
  getAllProductStocks
);
router.get(
  "/:id",
  authMiddleware,
  checkPermission("productStock", "read"),
  getProductStockById
);
router.put(
  "/:id",
  authMiddleware,
  checkPermission("productStock", "update"),
  productStockUpdateValidation,
  validate,
  updateProductStock
);
router.delete(
  "/:id",
  authMiddleware,
  checkPermission("productStock", "delete"),

  deleteProductStock
);

export default router;
