// export const checkPermission = (module, action) => {
//   return (req, res, next) => {
//     const permissions = req.user.role.permissions;

//     const allowed = permissions.some((permission) => {
//       return permission.module === module && permission.actions[action];
//     });
//     if (!allowed) {
//       return res.status(403).json({
//         success: false,
//         message: "Access denied",
//       });
//     }
//     next();
//   };
// };

export const checkPermission = (module, action) => {
  return (req, res, next) => {
    console.log("  Requested module:", JSON.stringify(module));
    console.log("  Requested action:", JSON.stringify(action));
    console.log("  User permissions:", req.user.role.permissions);
    if (!req.user || !req.user.role) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    const permissions = req.user.role.permissions;

    if (!Array.isArray(permissions)) {
      return res.status(403).json({
        success: false,
        message: "Permissions not configured",
      });
    }

    const modulePermission = permissions.find(
      (p) => p.module.toLowerCase() === module.toLowerCase()
    );

    if (!modulePermission || modulePermission.actions[action] !== true) {
      return res.status(403).json({
        success: false,
        message: "Permission denied",
      });
    }

    next();
  };
};
