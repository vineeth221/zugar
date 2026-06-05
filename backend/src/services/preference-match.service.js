const Project = require("../models/Project");

async function findProjectsByPreference(preference) {
  const query = {};

  if (preference.locations?.length) {
    query.location = {
      $regex: preference.locations.join("|"),
      $options: "i",
    };
  }

  if (preference.propertyTypes?.length) {
    query.propertyType = {
      $regex: preference.propertyTypes.join("|"),
      $options: "i",
    };
  }

  if (preference.budgetMax) {
    query.priceMin = {
      $lte: preference.budgetMax,
    };
  }

  return Project.find(query).limit(10).lean();
}

module.exports = {
  findProjectsByPreference,
};