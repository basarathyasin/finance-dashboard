const express = require("express");
const cors = require("cors");
const healthRouter = require("./routes/health.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "Finance Dashboard API is running" });
});

app.use("/api/health", healthRouter);

module.exports = app;
