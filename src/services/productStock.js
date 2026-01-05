import NotFoundError from "../errors/not-found-error.js";
import ProductStock from "../models/productStock.js";

export const createProductStock = async (req, res, next) => {
  try {
    const productStock = await ProductStock.create(req.body);
    res.status(201).json({
      success: true,
      message: "Product stock created successfully",
      data: productStock,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllProductStocks = async (req, res, next) => {
  try {
    const productStocks = await ProductStock.find({ isDeleted: false })
      .populate("product")
      .populate("wareHouse")
      .sort({
        createdAt: -1,
      });
    res.json({
      success: true,
      data: productStocks,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductStockById = async (req, res, next) => {
  try {
    const productStock = await ProductStock.findById(req.params.id)
      .populate("product")
      .populate("wareHouse");
    if (!productStock) throw new NotFoundError("Product stock not found");
    res.json({
      success: true,
      data: productStock,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProductStock = async (req, res, next) => {
  try {
    const productStock = await ProductStock.findOneAndUpdate(
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
    if (!productStock) throw new NotFoundError("Product stock not found");
    res.json({
      success: true,
      data: productStock,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProductStock = async (req, res, next) => {
  try {
    const deletedProductStock = await ProductStock.findOneAndDelete({
      _id: req.params.id,
      isDeleted: false,
    });
    if (!deletedProductStock)
      throw new NotFoundError("Product stock not found");
    res.json({
      success: true,
      message: "Product stock deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
