import mongoose from "mongoose";

const warehouseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
      unique: true,
    },
    extra: {
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
    collection: "pos_warehouses",
    toJSON: { getters: true },
  }
);

const WareHouse = mongoose.model("WareHouse", warehouseSchema);
export default WareHouse;
