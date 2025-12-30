import mongoose from "mongoose";

const productCategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    extra: {
      type: String,
      default: null,
      maxlength: 100,
    },
    c_type: {
      type: Number,
      default: 0,
    },
    rel_id: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: "pos_product_categories",
    toJSON: { getters: true },
  }
);

const ProductCategory = mongoose.model(
  "ProductCategory",
  productCategorySchema
);
export default ProductCategory;
