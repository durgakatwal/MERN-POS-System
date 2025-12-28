import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 150,
      trim: true,
    },
    company: {
      type: String,
      trim: true,
      maxlength: 150,
    },
    phone: {
      type: String,
      required: true,
      maxlength: 20,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      maxlength: 150,
      lowercase: true,
      unique: true,
      index: true,
    },
    address: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    region: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    postbox: {
      type: String,
      trim: true,
    },
    supplierGroup: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SupplierGroup",
    },
    taxId: {
      type: String,
      trim: true,
    },
    documentId: {
      type: String,
      trim: true,
    },
    customField: {
      type: Object,
      default: {},
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
    },
    balance: {
      type: Number,
      default: 0,
    },
    picture: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Supplier", supplierSchema);
