const mongoose = require("mongoose");

const recommendationSchema = new mongoose.Schema(
  {
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
      required: true,
      index: true,
    },

    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    confidenceScore: Number,
    financialFit: Number,
    commuteFit: Number,
    lifestyleFit: Number,
    appreciationFit: Number,

    riskLevel: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    reasons: [String],
    tradeoffs: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recommendation", recommendationSchema);