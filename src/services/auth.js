import ValidationError from "../errors/validation-error.js";
import Employee from "../models/Employee.js";
import { generateToken } from "../utils/jwt.js";
import bcrypt from "bcryptjs";

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const employee = await Employee.findOne({
      username,
      isDeleted: false,
      isActive: true,
    }).select("+password");
    if (!employee) throw new ValidationError("Invalid username or password");
    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) throw new ValidationError("Invalid username or password");
    const token = generateToken(employee);
    res.json({ success: true, data: { token, employee } });
  } catch (err) {
    next(err);
  }
};
