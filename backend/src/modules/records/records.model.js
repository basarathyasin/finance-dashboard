const mongoose = require("mongoose");

const recordsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Record = mongoose.models.Record || mongoose.model("Record", recordsSchema);

module.exports = Record;
