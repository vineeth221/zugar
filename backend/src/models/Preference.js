const mongoose = require("mongoose");

const preferenceSchema = new mongoose.Schema(
  {
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
      required: true,
      index: true,
    },

    budgetMin: Number,
    budgetMax: Number,

    purpose: {
      type: String,
      enum: ["end_use", "investment", "both"],
      default: "end_use",
    },

    propertyTypes: [String],
    locations: [String],
    priorities: [String],

    workLocation: String,
    familySize: String,
    possessionPreference: String,

    schoolsRequired: {
      type: Boolean,
      default: false,
    },

    rawInput: Object,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Preference", preferenceSchema);