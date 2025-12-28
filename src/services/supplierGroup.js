import SupplierGroup from "../models/supplierGroup.js";
import ValidationError from "../errors/validation-error.js";
import NotFoundError from "../errors/not-found-error.js";

export const createSupplierGroup = async (req, res, next) => {
  try {
    const exists = await SupplierGroup.findOne({
      name: req.body.name,
      isDeleted: false,
    });
    if (exists) throw ValidationError("Supplier group already exists");
    const supplierGroup = await SupplierGroup.create(req.body);
    res.status(201).json({
      success: true,
      message: "Supplier group created successfully",
      data: supplierGroup,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllSuppliersGroup = async (req, res, next) => {
  try {
    const groups = await SupplierGroup.find({ isDeleted: false }).sort({
      createdAt: -1,
    });
    res.json({
      success: true,
      data: groups,
    });
  } catch (error) {
    next(error);
  }
};

export const getSupplierGroupById = async (req, res, next) => {
  try {
    const group = await SupplierGroup.findOne({
      _id: req.params.id,
      isDeleted: false,
    });
    if (!group) throw new NotFoundError("Supplier group not found");
    res.json({
      success: true,
      data: group,
    });
  } catch (error) {
    next(error);
  }
};

export const updateSupplierGroup = async (req, res, next) => {
  try {
    const group = await SupplierGroup.findOneAndUpdate(
      {
        _id: req.params.id,
        isDeleted: false,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!group) throw new NotFoundError("Supplier group not found");
    res.json({
      success: true,
      data: group,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSupplierGroup = async (req, res, next) => {
  try {
    const group = await SupplierGroup.findOneAndUpdate(
      {
        _id: req.params.id,
        isDeleted: false,
      },
      {
        isDeleted: true,
      },
      {
        new: true,
      }
    );
    if (!group) throw new NotFoundError("Supplier group not found");
    res.json({
      success: true,
      message: "Supplier group deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
