const usersService = require("./users.service");
const asyncHandler = require("../../utils/async-handler");
const createError = require("../../utils/create-error");
const sendResponse = require("../../utils/send-response");
const {
  requireFields,
  validateEnum,
  validateObjectId,
} = require("../../utils/validation");

function validateCreateUserBody(body) {
  requireFields(body, ["name", "email", "password"]);
  validateEnum(body.role, ["viewer", "analyst", "admin"], "role");
  validateEnum(body.status, ["active", "inactive"], "status");
}

function validateUpdateUserBody(body) {
  if (body.role === undefined && body.status === undefined) {
    throw createError("role or status is required", 400);
  }

  validateEnum(body.role, ["viewer", "analyst", "admin"], "role");
  validateEnum(body.status, ["active", "inactive"], "status");
}

module.exports = {
  createUser: asyncHandler(async function createUser(req, res) {
    validateCreateUserBody(req.body);
    const data = await usersService.createUser(req.body);
    sendResponse(res, 201, data.message, {
      user: data.user,
    });
  }),
  getUsers: asyncHandler(async function getUsers(_req, res) {
    const data = await usersService.getUsers();
    sendResponse(res, 200, "Users fetched successfully", data);
  }),
  updateUser: asyncHandler(async function updateUser(req, res) {
    validateObjectId(req.params.id, "user id");
    validateUpdateUserBody(req.body);
    const data = await usersService.updateUser(req.params.id, req.body);
    sendResponse(res, 200, data.message, {
      user: data.user,
    });
  }),
};
