const Project = require("../models/Project");

function escapeRegex(value = "") {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function findProjectsByPreference(preference = {}) {
  const query = {};

  if (preference.locations?.length) {
    query.location = {
      $regex: preference.locations.map(escapeRegex).join("|"),
      $options: "i",
    };
  }

  if (preference.propertyTypes?.length) {
    query.propertyType = {
      $regex: preference.propertyTypes.map(escapeRegex).join("|"),
      $options: "i",
    };
  }

  if (preference.budgetMax) {
    query.priceMin = { $lte: preference.budgetMax };
  }

  const projects = await Project.find(query).limit(20).lean();

  return projects;
}

module.exports = {
  findProjectsByPreference,
};