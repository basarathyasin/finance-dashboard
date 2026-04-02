const mongoose = require("mongoose");

const dashboardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Dashboard =
  mongoose.models.Dashboard || mongoose.model("Dashboard", dashboardSchema);

module.exports = Dashboard;
