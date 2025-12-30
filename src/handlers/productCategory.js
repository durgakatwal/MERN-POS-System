import { validate } from "../middlewares/validatorMiddleware.js";
import {
  createProductCategory,
  deleteProductCategory,
  getAllProductCategories,
  getProductCategoryById,
  updateProductCategory,
} from "../services/productCategory.js";
import {
  createProductCategoryValidation,
  productCategoryByIdValidation,
} from "../validators/productCategory.js";
import express from "express";

const router = express.Router();

router.post(
  "/",
  createProductCategoryValidation,
  validate,
  createProductCategory
);
router.get("/", getAllProductCategories);
router.get(
  "/:id",
  productCategoryByIdValidation,
  validate,
  getProductCategoryById
);
router.put(
  "/:id",
  productCategoryByIdValidation,
  validate,
  updateProductCategory
);
router.delete(
  "/:id",
  productCategoryByIdValidation,
  validate,
  deleteProductCategory
);

export default router;
