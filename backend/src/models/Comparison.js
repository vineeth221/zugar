const mongoose = require("mongoose");

const comparisonSchema = new mongoose.Schema(
  {
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
      required: true,
      index: true,
    },

    projectIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },
    ],

    comparison: Object,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comparison", comparisonSchema);