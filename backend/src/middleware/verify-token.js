const jwt = require("jsonwebtoken");
const User = require("../modules/auth/auth.model");
const { JWT_SECRET } = require("../config/env");
const createError = require("../utils/create-error");

async function verifyToken(req, _res, next) {
  try {
    const authHeader = req.headers.authorization || "";

    if (!authHeader.startsWith("Bearer ")) {
      return next(createError("Authorization token is required", 401));
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return next(createError("User not found", 401));
    }

    // A valid token should not keep working for users who were later deactivated.
    if (user.status !== "active") {
      return next(createError("User account is inactive", 403));
    }

    req.user = user;
    next();
  } catch (error) {
    next(createError("Invalid or expired token", 401));
  }
}

module.exports = verifyToken;
