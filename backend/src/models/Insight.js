const mongoose = require("mongoose");

const insightSchema = new mongoose.Schema(
  {
    label: String,
    value: String,
    note: String,
    type: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Insight", insightSchema);