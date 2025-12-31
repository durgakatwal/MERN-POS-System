import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema({
  module: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    maxlength: 100,
  },
  actions: {
    create: { type: Boolean, default: false },
    read: { type: Boolean, default: false },
    update: { type: Boolean, default: false },
    delete: { type: Boolean, default: false },
  },
});

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 100,
    },
    permissions: [permissionSchema],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: "pos_roles",
    toJSON: { getters: true },
  }
);

export default mongoose.model("Role", roleSchema);
