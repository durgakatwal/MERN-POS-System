import express from "express";
import { createProductVariationOptionValidator } from "../validators/productVariationOption.js";
import { validate } from "../middlewares/validatorMiddleware.js";
import {
  createProductVariationOption,
  deleteVariationOption,
  getAllVariationOptions,
  getOptionsByVariationId,
  getVariationOptionById,
  updateVariationOption,
} from "../services/productVariationOption.js";

const router = express.Router();

router.post(
  "/",
  createProductVariationOptionValidator,
  validate,
  createProductVariationOption
);
router.get("/", getAllVariationOptions);
router.get("/variation/:id", getOptionsByVariationId);
router.get("/:id", getVariationOptionById);
router.put("/:id", updateVariationOption);
router.delete("/:id", deleteVariationOption);

export default router;
