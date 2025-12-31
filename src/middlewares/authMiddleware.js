// import jwt from "jsonwebtoken";
// import User from "../models/User.js";
// import { JWT_SECRET } from "../constants/env.js";

// export const authenticate = async (req, res, next) => {
//   try {
//     // Get token from header
//     const token = req.header("Authorization")?.replace("Bearer ", "");

//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: "Access denied. No token provided.",
//       });
//     }

//     // Verify token
//     const decoded = jwt.verify(token, JWT_SECRET);

//     // Find user
//     const user = await User.findById(decoded.userId);

//     if (!user || user.banned) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid token or user not found.",
//       });
//     }

//     // Attach user to request
//     req.user = user;
//     req.userId = user._id;
//     req.role = user.roleid;

//     next();
//   } catch (error) {
//     if (error.name === "JsonWebTokenError") {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid token.",
//       });
//     }
//     if (error.name === "TokenExpiredError") {
//       return res.status(401).json({
//         success: false,
//         message: "Token expired.",
//       });
//     }
//     next(error);
//   }
// };

// export const authorize = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.role)) {
//       return res.status(403).json({
//         success: false,
//         message: "Access denied. Insufficient permissions.",
//       });
//     }
//     next();
//   };
// };

// // Check if user has specific permission
// export const hasPermission = (module, permission) => {
//   return async (req, res, next) => {
//     try {
//       // This will need to check against pos_premissions table
//       // For now, we'll implement basic role-based check
//       const allowed = await checkUserPermission(req.userId, module, permission);

//       if (!allowed) {
//         return res.status(403).json({
//           success: false,
//           message: `You don't have permission to ${permission} in ${module}`,
//         });
//       }
//       next();
//     } catch (error) {
//       next(error);
//     }
//   };
// };

// // Helper function to check permissions
// async function checkUserPermission(userId, module, permission) {
//   // TODO: Implement based on pos_premissions table
//   // For now, return true for admin roles
//   const user = await User.findById(userId);
//   return user.roleid <= 2; // Admin/manager roles
// }

import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants/env.js";
import Employee from "../models/Employee.js";
export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await Employee.findById(decoded.id)
      .populate("role")
      .populate("wareHouse");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid token.",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid token.",
    });
  }
};
