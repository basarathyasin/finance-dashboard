const bcrypt = require("bcrypt");
const User = require("./users.model");
const createError = require("../../utils/create-error");

function buildUserResponse(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

async function createUser(userData) {
  const { name, email, password, role, status } = userData;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw createError("User already exists with this email", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: role || "viewer",
    status: status || "active",
  });

  return {
    message: "User created successfully",
    user: buildUserResponse(user),
  };
}

async function getUsers() {
  const users = await User.find().sort({ createdAt: -1 });

  return {
    users: users.map(buildUserResponse),
  };
}

async function updateUser(userId, updateData) {
  const updates = {};

  if (updateData.role) {
    updates.role = updateData.role;
  }

  if (updateData.status) {
    updates.status = updateData.status;
  }

  if (Object.keys(updates).length === 0) {
    throw createError("role or status is required to update the user", 400);
  }

  const user = await User.findByIdAndUpdate(userId, updates, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    throw createError("User not found", 404);
  }

  return {
    message: "User updated successfully",
    user: buildUserResponse(user),
  };
}

module.exports = {
  createUser,
  getUsers,
  updateUser,
};
