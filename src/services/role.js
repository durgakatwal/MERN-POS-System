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
    const { permissions: newPermissions, ...otherFields } = req.body;

    // Find existing role
    const existingRole = await Role.findById(req.params.id);
    if (!existingRole || existingRole.isDeleted) {
      throw new NotFoundError("Role not found");
    }

    // If permissions are provided, merge them
    let finalPermissions = existingRole.permissions || [];

    if (newPermissions && Array.isArray(newPermissions)) {
      // Create a map of existing permissions by module
      const existingMap = new Map(finalPermissions.map((p) => [p.module, p]));

      // Override or add new permissions
      newPermissions.forEach((newPerm) => {
        existingMap.set(newPerm.module, newPerm);
      });

      // Convert back to array
      finalPermissions = Array.from(existingMap.values());
    }

    // Prepare update object
    const updateData = {
      ...otherFields,
      permissions: finalPermissions,
    };

    const updatedRole = await Role.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: "Role updated successfully",
      data: updatedRole,
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
