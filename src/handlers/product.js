import express from "express";
import {
  productCreateValidation,
  mongoIdParamValidator,
  productUpdateValidation,
} from "../validators/product.js";
import { validate } from "../middlewares/validatorMiddleware.js";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../services/product.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { checkPermission } from "../middlewares/permissionMiddleware.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  checkPermission("product", "create"),
  productCreateValidation,
  validate,
  createProduct
);
router.get(
  "/",
  authMiddleware,
  checkPermission("product", "read"),
  getAllProducts
);
router.get(
  "/:id",
  authMiddleware,
  checkPermission("product", "read"),
  mongoIdParamValidator,
  validate,
  getProductById
);
router.put(
  "/:id",
  authMiddleware,
  checkPermission("product", "update"),
  productUpdateValidation,
  validate,
  updateProduct
);
router.delete(
  "/:id",
  authMiddleware,
  checkPermission("product", "delete"),
  mongoIdParamValidator,
  validate,
  deleteProduct
);

export default router;
