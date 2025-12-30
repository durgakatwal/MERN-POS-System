import WareHouse from "../models/wareHouse.js";
import ValidationError from "../errors/validation-error.js";

export const createWareHouse = async (req, res, next) => {
  try {
    const exists = await WareHouse.findOne({
      title: req.body.title,
      isDeleted: false,
    });
    if (exists) throw ValidationError("WareHouse already exists");
    const wareHouse = await WareHouse.create(req.body);

    res.status(201).json({
      success: true,
      message: "WareHouse created successfully",
      data: wareHouse,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllWareHouses = async (req, res, next) => {
  try {
    const warehouses = await WareHouse.find({ isDeleted: false }).sort({
      createdAt: -1,
    });
    res.json({
      success: true,
      data: warehouses,
    });
  } catch (error) {
    next(error);
  }
};

export const getWareHouseById = async (req, res, next) => {
  try {
    const wareHouse = await WareHouse.findById(req.params.id).populate("");
    if (!wareHouse) throw new NotFoundError("WareHouse not found");
    res.json({
      success: true,
      data: wareHouse,
    });
  } catch (error) {
    next(error);
  }
};

export const updateWareHouse = async (req, res, next) => {
  try {
    const wareHouse = await WareHouse.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!wareHouse) throw new NotFoundError("WareHouse not found");
    res.json({
      success: true,
      data: wareHouse,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteWareHouse = async (req, res, next) => {
  try {
    const wareHouse = await WareHouse.findByIdAndDelete(req.params.id, {
      isDeleted: true,
    });
    if (!wareHouse) throw new NotFoundError("WareHouse not found");
    res.json({
      success: true,
      message: "WareHouse deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
