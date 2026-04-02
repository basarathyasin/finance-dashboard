const createError = require("../utils/create-error");

function notFound(req, _res, next) {
  next(createError(`Route not found: ${req.method} ${req.originalUrl}`, 404));
}

module.exports = notFound;
