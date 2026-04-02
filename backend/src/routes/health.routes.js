const express = require("express");

const healthRouter = express.Router();

healthRouter.get("/", (_req, res) => {
  res.json({
    status: "ok",
    service: "finance-dashboard-backend",
    timestamp: new Date().toISOString(),
  });
});

module.exports = healthRouter;
