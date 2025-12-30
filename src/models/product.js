import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    product_code: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    product_category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductCategory",
      required: true,
    },
    wareHouse: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WareHouse",
      required: true,
    },
    product_price: {
      type: Number,
      default: 0,
    },
    fproduct_price: {
      type: Number,
      default: 0,
    },
    taxrate: {
      type: Number,
      default: 0,
    },
    disrate: {
      type: Number,
      default: 0,
    },
    qty: {
      type: Number,
      default: 0,
      required: true,
    },
    alert: {
      type: Number,
    },
    unit: {
      type: String,
      default: "unit",
    },
    image: {
      type: String,
      default: "deskgoo.png",
    },
    barcode: {
      type: String,
      default: "",
    },
    expiry: {
      type: Date,
      default: Date.now,
    },
    code_type: {
      type: String,
      default: "EAN13",
    },
    variation_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductVariation",
      default: null,
    },
    variation_option_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductVariationOption",
      default: null,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: "pos_products",
    toJSON: { getters: true },
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
