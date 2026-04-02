const authService = require("./auth.service");
const asyncHandler = require("../../utils/async-handler");
const createError = require("../../utils/create-error");

function validateRegisterBody(body) {
  const { name, email, password } = body;

  if (!name || !email || !password) {
    throw createError("name, email and password are required", 400);
  }
}

function validateLoginBody(body) {
  const { email, password } = body;

  if (!email || !password) {
    throw createError("email and password are required", 400);
  }
}

module.exports = {
  registerUser: asyncHandler(async function registerUser(req, res) {
    validateRegisterBody(req.body);
    const data = await authService.registerUser(req.body);
    res.status(201).json(data);
  }),
  loginUser: asyncHandler(async function loginUser(req, res) {
    validateLoginBody(req.body);
    const data = await authService.loginUser(req.body);
    res.json(data);
  }),
  getCurrentUser: asyncHandler(async function getCurrentUser(req, res) {
    const data = await authService.getCurrentUser(req.user);
    res.json(data);
  }),
};
