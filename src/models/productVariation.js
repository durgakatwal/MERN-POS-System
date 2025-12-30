import mongoose from "mongoose";

const productVariationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      maxlength: 100,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: "pos_product_variations",
    toJSON: { getters: true },
  }
);

const ProductVariation = mongoose.model(
  "ProductVariation",
  productVariationSchema
);
export default ProductVariation;
