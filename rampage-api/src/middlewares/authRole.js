module.exports = (requiredRoles = []) => {
  return (req, res, next) => {
    const userRole = req.user?.role;

    if (!userRole) {
      return res.status(403).json({ 
        success: false,
        message: "İstifadəçi rolu təyin edilməyib",
        statusCode: 403 
      });
    }

    const rolesArray = Array.isArray(requiredRoles)
      ? requiredRoles
      : [requiredRoles];

    if (!rolesArray.includes(userRole)) {
      return res.status(403).json({ 
        success: false,
        message: "Bu əməliyyat üçün icazəniz yoxdur",
        requiredRoles,
        userRole,
        statusCode: 403 
      });
    }

    next();
  };
};