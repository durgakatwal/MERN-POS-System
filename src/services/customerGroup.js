import CustomerGroup from "../models/customerGroup.js";
import ValidationError from "../errors/validation-error.js";

//create
export const createCustomerGroup = async (req, res, next) => {
  try {
    const exists = await CustomerGroup.findOne({
      name: req.body.name,
      isDeleted: false,
    });
    if (exists) throw ValidationError("Customer group already exists");
    const customerGroup = await CustomerGroup.create(req.body);
    res.status(201).json({
      success: true,
      message: "Customer group created successfully",
      data: customerGroup,
    });
  } catch (error) {
    next(error);
  }
};

//get all customer groups
export const getAllCustomersGroups = async (req, res, next) => {
  try {
    const groups = await CustomerGroup.find({ isDeleted: false }).sort({
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

//get customerGroup by id
export const getCustomerGroupById = async (req, res, next) => {
  try {
    const group = await CustomerGroup.findOne({
      _id: req.params.id,
      isDeleted: false,
    });
    if (!group) throw new NotFoundError("Customer group not found");
    res.json({
      success: true,
      data: group,
    });
  } catch (error) {
    next(error);
  }
};

//update the customerGroup
export const updateCustomerGroup = async (req, res, next) => {
  try {
    const group = await CustomerGroup.findOneAndUpdate(
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
    if (!group) throw new NotFoundError("Customer group not found");
    res.json({
      success: true,
      data: group,
    });
  } catch (error) {
    next(error);
  }
};

//delete the customerGroup
export const deleteCustomerGroup = async (req, res, next) => {
  try {
    const group = await CustomerGroup.findOneAndUpdate(
      {
        _id: req.parmas.id,
        isDeleted: false,
      },
      {
        isDeleted: true,
      },
      {
        new: true,
      }
    );
    if (!group) throw new NotFoundError("Customer group not found");
    res.json({
      success: true,
      message: "Customer group deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
