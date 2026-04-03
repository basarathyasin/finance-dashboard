const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./auth.model");
const createError = require("../../utils/create-error");
const { JWT_SECRET, JWT_EXPIRES_IN } = require("../../config/env");

function buildAuthResponse(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
  };
}

function createToken(userId) {
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

async function registerUser(userData) {
  const { name, email, password } = userData;
  const userCount = await User.countDocuments();

  if (userCount > 0) {
    throw createError(
      "Public registration is closed. Ask an admin to create your account.",
      403
    );
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw createError("User already exists with this email", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "admin",
    status: "active",
  });

  return {
    message: "User registered successfully",
    token: createToken(user._id.toString()),
    user: buildAuthResponse(user),
  };
}

async function loginUser(loginData) {
  const { email, password } = loginData;

  const user = await User.findOne({ email });

  if (!user) {
    throw createError("Invalid email or password", 401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw createError("Invalid email or password", 401);
  }

  if (user.status !== "active") {
    throw createError("User account is inactive", 403);
  }

  return {
    message: "Login successful",
    token: createToken(user._id.toString()),
    user: buildAuthResponse(user),
  };
}

async function getCurrentUser(user) {
  return {
    user: buildAuthResponse(user),
  };
}

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
};
