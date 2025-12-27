import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 50,
      trim: true,
    },
    company: {
      type: String,
      default: null,
      maxlength: 100,
      trim: true,
    },
    phone: {
      type: String,
      default: null,
      required: true,
      maxlength: 20,
      trim: true,
    },
    email: {
      type: String,
      default: null,
      required: true,
      maxlength: 100,
      lowercase: true,
      unique: true,
      index: true,
    },
    address: {
      type: String,
      default: null,
      maxlength: 100,
    },
    city: {
      type: String,
      default: null,
      maxlength: 50,
    },
    region: {
      type: String,
      default: null,
      maxlength: 50,
    },
    country: {
      type: String,
      default: null,
      maxlength: 50,
    },
    postbox: {
      type: String,
      default: null,
      maxlength: 20,
    },
    shipping: {
      name: String,
      phone: String,
      address: String,
      city: String,
      region: String,
      country: String,
      postbox: String,
    },
    customerGroup: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CustomerGroup",
    },
    taxid: {
      type: String,
      default: null,
      maxlength: 100,
    },
    documentId: {
      type: String,
      default: null,
      maxlength: 255,
    },
    customField: mongoose.Schema.Types.Mixed,
    discount: {
      type: mongoose.Decimal128,
      default: 0.0,
      get: (v) => parseFloat(v.toString()),
    },
    balance: {
      type: mongoose.Decimal128,
      default: 0.0,
      get: (v) => parseFloat(v.toString()),
    },
    picture: {
      type: String,
      default: "example.png",
      maxlength: 100,
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
  { timestamps: true, collection: "pos_customers", toJSON: { getters: true } }
);

const Customer = mongoose.model("Customer", customerSchema);
export default Customer;
