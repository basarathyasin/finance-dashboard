const dashboardService = require("./dashboard.service");
const asyncHandler = require("../../utils/async-handler");

module.exports = {
  getDashboardMessage: asyncHandler(async function getDashboardMessage(_req, res) {
    const data = await dashboardService.getDashboardMessage();
    res.json(data);
  }),
  getHealthStatus: asyncHandler(async function getHealthStatus(_req, res) {
    const data = await dashboardService.getHealthStatus();
    res.json(data);
  }),
};
