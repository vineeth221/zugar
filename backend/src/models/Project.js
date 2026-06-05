const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: String,
    builder: String,
    location: String,
    propertyType: String,
    priceMin: Number,
    priceMax: Number,
    unitTypes: [String],
    possession: String,

    highlights: [String],
    drawbacks: [String],
    nearbySchools: [String],
    nearbyHospitals: [String],
    commuteNotes: String,
    appreciationNotes: String,

    idealFor: [String],
    tags: [String],

    brochureUrl: String,
    floorPlanUrls: [String],
    imageUrls: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);