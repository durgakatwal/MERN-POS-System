import Employee from "../models/Employee.js";
import ValidationError from "../errors/validation-error.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";
export const createEmployee = async (req, res, next) => {
  try {
    const exists = await Employee.findOne({
      username: req.body.username,
      email: req.body.email,
      isDeleted: false,
    });
    if (exists) throw ValidationError("Employee already exists");
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const employee = await Employee.create({
      ...req.body,
      password: hashedPassword,
    });
    const token = generateToken(employee);
    res.status(201).json({
      success: true,
      message: "Employee created successfully",
      data: employee,
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find({ isDeleted: false });
    res.json({
      success: true,
      data: employees,
    });
  } catch (error) {
    next(error);
  }
};

export const getEmployeeById = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) throw ValidationError("Employee not found");
    res.json({
      success: true,
      data: employee,
    });
  } catch (error) {
    next(error);
  }
};

export const updateEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      {
        _id: req.params.id,
        isDeleted: false,
      },
      { ...req.body },
      { new: true }
    );
    if (!employee) throw ValidationError("Employee not found");
    res.json({
      success: true,
      data: employee,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findOneAndUpdate(
      {
        _id: req.params.id,
        isDeleted: false,
      },
      { isDeleted: true },
      { new: true }
    );
    if (!employee) throw ValidationError("Employee not found");
    res.json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
