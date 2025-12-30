import mongoose from "mongoose";

const productVariationOptionSchema = new mongoose.Schema(
  {
    variation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductVariation",
      required: true,
    },
    value: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: "pos_product_variation_options",
    toJSON: { getters: true },
  }
);

const ProductVariationOption = mongoose.model(
  "ProductVariationOption",
  productVariationOptionSchema
);
export default ProductVariationOption;
