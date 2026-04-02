const dashboardService = require("./dashboard.service");
const asyncHandler = require("../../utils/async-handler");
const sendResponse = require("../../utils/send-response");

module.exports = {
  getDashboardMessage: asyncHandler(async function getDashboardMessage(_req, res) {
    const data = await dashboardService.getDashboardMessage();
    sendResponse(res, 200, "Dashboard message fetched successfully", data);
  }),
  getHealthStatus: asyncHandler(async function getHealthStatus(_req, res) {
    const data = await dashboardService.getHealthStatus();
    sendResponse(res, 200, "Health status fetched successfully", data);
  }),
  getSummary: asyncHandler(async function getSummary(req, res) {
    const data = await dashboardService.getSummary(req.user._id);
    sendResponse(res, 200, "Dashboard summary fetched successfully", data);
  }),
  getCategories: asyncHandler(async function getCategories(req, res) {
    const data = await dashboardService.getCategories(req.user._id);
    sendResponse(res, 200, "Dashboard categories fetched successfully", data);
  }),
  getTrends: asyncHandler(async function getTrends(req, res) {
    const data = await dashboardService.getTrends(req.user._id);
    sendResponse(res, 200, "Dashboard trends fetched successfully", data);
  }),
};
