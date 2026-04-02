const usersService = require("./users.service");
const asyncHandler = require("../../utils/async-handler");
const createError = require("../../utils/create-error");

function validateCreateUserBody(body) {
  const { name, email, password } = body;

  if (!name || !email || !password) {
    throw createError("name, email and password are required", 400);
  }
}

function validateUpdateUserBody(body) {
  if (!body.role && !body.status) {
    throw createError("role or status is required", 400);
  }
}

module.exports = {
  createUser: asyncHandler(async function createUser(req, res) {
    validateCreateUserBody(req.body);
    const data = await usersService.createUser(req.body);
    res.status(201).json(data);
  }),
  getUsers: asyncHandler(async function getUsers(_req, res) {
    const data = await usersService.getUsers();
    res.json(data);
  }),
  updateUser: asyncHandler(async function updateUser(req, res) {
    validateUpdateUserBody(req.body);
    const data = await usersService.updateUser(req.params.id, req.body);
    res.json(data);
  }),
};
