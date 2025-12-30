import express from "express";
import {
  createProductVariation,
  deleteProductVariation,
  getAllProductVariations,
  getProductVariationById,
  updateProductVariation,
} from "../services/productVariation.js";
import {
  createProductVariationValidator,
  updateProductVariationValidator,
} from "../validators/productVariation.js";
import { validate } from "../middlewares/validatorMiddleware.js";

const router = express.Router();

router.post(
  "/",
  createProductVariationValidator,
  validate,
  createProductVariation
);
router.get("/", getAllProductVariations);
router.get("/:id", getProductVariationById);
router.put(
  "/:id",
  updateProductVariationValidator,
  validate,
  updateProductVariation
);
router.delete("/:id", deleteProductVariation);

export default router;
