// module.exports = (requiredRoles = []) => {
//   return (req, res, next) => {
//     const userRole = req.user?.role;

//     if (!userRole) return res.sendStatus(403); // no role = forbidden

//     const rolesArray = Array.isArray(requiredRoles)
//       ? requiredRoles
//       : [requiredRoles];

//     if (!rolesArray.includes(userRole)) {
//       return res.status(403).json({ message: "Forbidden: Insufficient role" });
//     }

//     next();
//   };
// };