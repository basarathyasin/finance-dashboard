const express = require("express");
const dashboardController = require("./dashboard.controller");

const router = express.Router();

router.get("/", dashboardController.getDashboardMessage);
router.get("/health", dashboardController.getHealthStatus);

module.exports = router;
