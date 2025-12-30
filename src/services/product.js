import Product from "../models/product.js";
import ValidationError from "../errors/validation-error.js";

export const createProduct = async (req, res, next) => {
  try {
    const exists = await Product.findOne({
      product_name: req.body.product_name,
      product_code: req.body.product_code,
      isDeleted: false,
    });
    if (exists) throw ValidationError("Product already exists");
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ isDeleted: false })
      .populate("product_category", "title")
      .populate("wareHouse", "title")
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("product_category", "title")
      .populate("wareHouse", "title")
      .sort({ createdAt: -1 });
    if (!product) throw ValidationError("Product not found");
    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) throw ValidationError("Product not found");
    res.json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );
    if (!product) throw ValidationError("Product not found");
    res.json({
      success: true,
      message: "Product deleted successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};
