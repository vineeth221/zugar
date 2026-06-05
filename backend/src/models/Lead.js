const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    sessionId: String,
    projectId: String,
    projectName: String,
    builder: String,
    userRequirement: String,
    conversationSummary: String,
    status: {
      type: String,
      default: "new",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lead", leadSchema);