const usersService = require("./users.service");
const asyncHandler = require("../../utils/async-handler");

module.exports = {
  getUsersStatus: asyncHandler(async function getUsersStatus(_req, res) {
    const data = await usersService.getUsersStatus();
    res.json(data);
  }),
};
