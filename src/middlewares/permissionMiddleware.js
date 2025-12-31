export const checkPermission = (module, action) => {
  return (req, res, next) => {
    const permissions = req.user.role.permissions;

    const allowed = permissions.some((permission) => {
      return permission.module === module && permission.actions[action];
    });
    if (!allowed) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }
    next();
  };
};
