import mongoose from "mongoose";
import ProductVariationOption from "../models/productVariationOption.js";
import NotFoundError from "../errors/not-found-error.js";
export const createProductVariationOption = async (req, res, next) => {
  try {
    const productVariationOption = await ProductVariationOption.create(
      req.body
    );
    res.status(201).json({
      success: true,
      message: "Product variation option created successfully",
      data: productVariationOption,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllVariationOptions = async (req, res, next) => {
  try {
    const options = await ProductVariationOption.find().populate(
      "variation",
      "name"
    );
    if (!options) throw new NotFoundError("Product variation option not found");
    res.json({
      success: true,
      data: options,
    });
  } catch (error) {
    next(error);
  }
};

export const getOptionsByVariationId = async (req, res, next) => {
  try {
    const variationId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(variationId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid variation id",
      });
    }

    const options = await ProductVariationOption.find({
      variation: variationId,
    });
    if (!options) throw new NotFoundError("Product variation option not found");
    res.json({
      success: true,
      data: options,
    });
  } catch (error) {
    next(error);
  }
};

export const getVariationOptionById = async (req, res, next) => {
  try {
    const optionId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(optionId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid option id",
      });
    }

    const option = await ProductVariationOption.findById(optionId);
    if (!option) throw new NotFoundError("Product variation option not found");
    res.json({
      success: true,
      data: option,
    });
  } catch (error) {
    next(error);
  }
};

// export const updateVariationOption = async (req, res, next) => {
//   try {
//     const optionId = req.params.id;

//     if (!mongoose.Types.ObjectId.isValid(optionId)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid option id",
//       });
//     }

//     const option = await ProductVariationOption.findByIdAndUpdate(
//       optionId,
//       req.body,
//       { new: true, runValidators: true }
//     );
//     res.json({
//       success: true,
//       data: option,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

export const updateVariationOption = async (req, res, next) => {
  try {
    const variationOption = await ProductVariationOption.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      req.body,
      { new: true, runValidators: true }
    );
    if (!variationOption) {
      throw new NotFoundError("Product variation option not found");
    }
    res.json({
      success: true,
      data: variationOption,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteVariationOption = async (req, res, next) => {
  try {
    const optionId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(optionId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid option id",
      });
    }

    const option = await ProductVariationOption.findOneAndUpdate(
      optionId,
      { isDeleted: true },
      { new: true }
    );
    if (!option) throw new NotFoundError("Product variation option not found");
    res.json({
      success: true,
      data: option,
    });
  } catch (error) {
    next(error);
  }
};
