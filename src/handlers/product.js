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

const router = express.Router();

router.post("/", productCreateValidation, validate, createProduct);
router.get("/", getAllProducts);
router.get("/:id", mongoIdParamValidator, validate, getProductById);
router.put("/:id", productUpdateValidation, validate, updateProduct);
router.delete("/:id", mongoIdParamValidator, validate, deleteProduct);

export default router;
