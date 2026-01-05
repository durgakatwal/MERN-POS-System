import mongoose from "mongoose";

const productStockSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    wareHouse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WareHouse",
      required: true,
    },
    quantity: {
      type: Number,
      default: 0,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
    collection: "productStock",
  }
);

productStockSchema.index({ product: 1, wareHouse: 1 }, { unique: true });

const ProductStock = mongoose.model("ProductStock", productStockSchema);

export default ProductStock;
