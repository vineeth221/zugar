const Project = require("../models/Project");

function extractBudget(message) {
  const lower = message.toLowerCase();

  if (lower.includes("2.5cr") || lower.includes("2.5 crore")) {
    return 25000000;
  }

  if (lower.includes("2cr") || lower.includes("2 crore")) {
    return 20000000;
  }

  if (lower.includes("1.5cr") || lower.includes("1.5 crore")) {
    return 15000000;
  }

  return null;
}

async function findMatchingProjects(message) {
  const lower = message.toLowerCase();
  const query = {};

  if (lower.includes("sarjapur")) {
    query.location = { $regex: "sarjapur", $options: "i" };
  }

  if (lower.includes("villa") || lower.includes("villas")) {
    query.propertyType = { $regex: "villa", $options: "i" };
  }

  if (lower.includes("apartment") || lower.includes("flat")) {
    query.propertyType = { $regex: "apartment|flat", $options: "i" };
  }

  const budget = extractBudget(message);

  if (budget) {
    query.priceMin = { $lte: budget };
  }

  const projects = await Project.find(query).limit(5).lean();

  return projects;
}

module.exports = {
  findMatchingProjects,
};