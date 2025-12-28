import mongoose from "mongoose";

const supplierGroupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
      unique: true,
    },
    discount: {
      type: mongoose.Decimal128,
      default: 0.0,
      get: (v) => parseFloat(v.toString()),
    },
    description: {
      type: String,
      default: null,
      maxlength: 255,
    },
    location: {
      type: Number,
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: "pos_supplier_groups",
    toJSON: { getters: true },
  }
);

const SupplierGroup = mongoose.model("SupplierGroup", supplierGroupSchema);
export default SupplierGroup;
