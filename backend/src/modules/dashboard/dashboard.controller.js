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
  getSummary: asyncHandler(async function getSummary(req, res) {
    const data = await dashboardService.getSummary(req.user._id);
    res.json(data);
  }),
  getCategories: asyncHandler(async function getCategories(req, res) {
    const data = await dashboardService.getCategories(req.user._id);
    res.json(data);
  }),
  getTrends: asyncHandler(async function getTrends(req, res) {
    const data = await dashboardService.getTrends(req.user._id);
    res.json(data);
  }),
};
