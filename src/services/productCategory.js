import ValidationError from "../errors/validation-error.js";
import ProductCategory from "../models/productCategory.js";

export const createProductCategory = async (req, res, next) => {
  try {
    const exists = await ProductCategory.findOne({
      title: req.body.title,
      isDeleted: false,
    });
    if (exists) throw ValidationError("Product category already exists");
    const productCategory = await ProductCategory.create(req.body);
    res.status(201).json({
      success: true,
      message: "Product category created successfully",
      data: productCategory,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllProductCategories = async (req, res, next) => {
  try {
    const categories = await ProductCategory.find({ isDeleted: false }).sort({
      createdAt: -1,
    });
    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductCategoryById = async (req, res, next) => {
  try {
    const category = await ProductCategory.findById(req.params.id);
    if (!category) throw new NotFoundError("Product category not found");
    res.json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProductCategory = async (req, res, next) => {
  try {
    const category = await ProductCategory.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!category) throw new NotFoundError("Product category not found");
    res.json({
      success: true,
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProductCategory = async (req, res, next) => {
  try {
    const category = await ProductCategory.findOneAndDelete({
      _id: req.params.id,
      isDeleted: false,
    });
    if (!category) throw new NotFoundError("Product category not found");
    res.json({
      success: true,
      message: "Product category deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
