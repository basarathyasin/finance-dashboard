const authService = require("./auth.service");
const asyncHandler = require("../../utils/async-handler");
const sendResponse = require("../../utils/send-response");
const { requireFields } = require("../../utils/validation");

function validateRegisterBody(body) {
  requireFields(body, ["name", "email", "password"]);
}

function validateLoginBody(body) {
  requireFields(body, ["email", "password"]);
}

module.exports = {
  registerUser: asyncHandler(async function registerUser(req, res) {
    validateRegisterBody(req.body);
    const data = await authService.registerUser(req.body);
    sendResponse(res, 201, data.message, {
      token: data.token,
      user: data.user,
    });
  }),
  loginUser: asyncHandler(async function loginUser(req, res) {
    validateLoginBody(req.body);
    const data = await authService.loginUser(req.body);
    sendResponse(res, 200, data.message, {
      token: data.token,
      user: data.user,
    });
  }),
  getCurrentUser: asyncHandler(async function getCurrentUser(req, res) {
    const data = await authService.getCurrentUser(req.user);
    sendResponse(res, 200, "Current user fetched successfully", data);
  }),
};
