const createError = require("../utils/create-error");

function authorizeRoles(...roles) {
  return function checkUserRole(req, _res, next) {
    if (!req.user) {
      return next(createError("User not authenticated", 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(createError("You are not authorized to access this route", 403));
    }

    next();
  };
}

module.exports = authorizeRoles;
