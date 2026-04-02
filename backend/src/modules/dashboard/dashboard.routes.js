const express = require("express");
const dashboardController = require("./dashboard.controller");
const verifyToken = require("../../middleware/verify-token");

const router = express.Router();

router.get("/", dashboardController.getDashboardMessage);
router.get("/health", dashboardController.getHealthStatus);
router.get("/dashboard/summary", verifyToken, dashboardController.getSummary);
router.get("/dashboard/categories", verifyToken, dashboardController.getCategories);
router.get("/dashboard/trends", verifyToken, dashboardController.getTrends);

module.exports = router;
