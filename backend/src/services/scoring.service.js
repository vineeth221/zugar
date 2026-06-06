function calculateProjectScore(project, preference = {}) {
  let score = 50;
  const reasons = [];
  const tradeoffs = [];

  const matchesLocation = preference.locations?.some((loc) =>
    project.location?.toLowerCase().includes(String(loc).toLowerCase())
  );

  if (matchesLocation) {
    score += 20;
    reasons.push(`Matches preferred location: ${project.location}`);
  }

  const matchesType = preference.propertyTypes?.some((type) =>
    project.propertyType?.toLowerCase().includes(String(type).toLowerCase())
  );

  if (matchesType) {
    score += 15;
    reasons.push(`Matches property type: ${project.propertyType}`);
  }

  if (preference.budgetMax && project.priceMin <= preference.budgetMax) {
    score += 20;
    reasons.push("Fits within your budget range");
  } else {
    tradeoffs.push("May stretch your preferred budget");
  }

  if (
    preference.priorities?.includes("Schools") &&
    (project.schools?.length || project.nearbySchools?.length)
  ) {
    score += 8;
    reasons.push("Has school access based on available data");
  }

  if (preference.priorities?.includes("Appreciation")) {
    score += 5;
    reasons.push("Good appreciation potential based on location fit");
  }

  score = Math.min(score, 98);

  return {
    confidenceScore: score,
    financialFit: project.priceMin <= preference.budgetMax ? 90 : 65,
    commuteFit: preference.priorities?.includes("Commute") ? 85 : 75,
    lifestyleFit: score >= 80 ? 88 : 72,
    appreciationFit: preference.priorities?.includes("Appreciation") ? 86 : 75,
    riskLevel: score >= 80 ? "Low" : score >= 65 ? "Medium" : "High",
    reasons,
    tradeoffs,
  };
}

module.exports = {
  calculateProjectScore,
};