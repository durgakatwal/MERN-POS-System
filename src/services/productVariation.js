import ProductVariation from "../models/productVariation.js";
import ValidationError from "../errors/validation-error.js";
export const createProductVariation = async (req, res, next) => {
  try {
    const exists = await ProductVariation.findOne({
      name: req.body.name,
      isDeleted: false,
    });
    if (exists) throw ValidationError("Product variation already exists");
    const productVariation = await ProductVariation.create(req.body);
    res.status(201).json({
      success: true,
      message: "Product variation created successfully",
      data: productVariation,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllProductVariations = async (req, res, next) => {
  try {
    const variations = await ProductVariation.find().populate("name");

    res.json({
      success: true,
      data: variations,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductVariationById = async (req, res, next) => {
  try {
    const productVariation = await ProductVariation.findById(req.params.id);
    res.json({
      success: true,
      data: productVariation,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProductVariation = async (req, res, next) => {
  try {
    const productVariation = await ProductVariation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!productVariation) throw ValidationError("Product variation not found");
    res.json({
      success: true,
      data: productVariation,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProductVariation = async (req, res, next) => {
  try {
    const productVariation = await ProductVariation.findOneAndUpdate(
      { isDeleted: false },
      { isDeleted: true },
      { new: true }
    );
    if (!productVariation) throw ValidationError("Product variation not found");
    res.json({
      success: true,
      message: "Product variation deleted successfully",
      data: productVariation,
    });
  } catch (error) {
    next(error);
  }
};
