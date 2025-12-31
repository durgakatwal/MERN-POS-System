import Role from "../models/role.js";
import ValidationError from "../errors/validation-error.js";
import { param } from "express-validator";
import NotFoundError from "../errors/not-found-error.js";

export const createRole = async (req, res, next) => {
  try {
    const exists = await Role.findOne({
      name: req.body.name,
      isDeleted: false,
    });
    if (exists) throw ValidationError("Role already exists");
    const role = await Role.create(req.body);
    res.status(201).json({
      success: true,
      message: "Role created successfully",
      data: role,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllRoles = async (req, res, next) => {
  try {
    const roles = await Role.find({ isDeleted: false });
    res.json({
      success: true,
      data: roles,
    });
  } catch (error) {
    next(error);
  }
};

export const getRolesById = async (req, res, next) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role || role.isDeleted) throw ValidationError("Role not found");
    res.json({
      success: true,
      data: role,
    });
  } catch (error) {
    next(error);
  }
};

export const updateRole = async (req, res, next) => {
  try {
    const role = await Role.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!role) throw ValidationError("Role not found");
    res.json({
      success: true,
      message: "Role updated successfully",
      data: role,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteRole = async (req, res, next) => {
  try {
    const role = await Role.findOneAndUpdate(
      { _id: req.params.id },
      { isDeleted: true },
      { new: true }
    );
    if (!role) throw NotFoundError("Role not found");
    res.json({
      success: true,
      message: "Role deleted successfully",
      data: role,
    });
  } catch (error) {
    next(error);
  }
};
