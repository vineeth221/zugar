function hasMatch(list = [], value = "") {
    return list.some((item) =>
      value.toLowerCase().includes(String(item).toLowerCase())
    );
  }
  
  function calculateProjectScore(project, preference) {
    let score = 50;
    const reasons = [];
    const tradeoffs = [];
  
    if (
      preference.locations?.some((loc) =>
        project.location?.toLowerCase().includes(loc.toLowerCase())
      )
    ) {
      score += 15;
      reasons.push(`Matches preferred location: ${project.location}`);
    }
  
    if (
      preference.propertyTypes?.some((type) =>
        project.propertyType?.toLowerCase().includes(type.toLowerCase())
      )
    ) {
      score += 15;
      reasons.push(`Matches preferred property type: ${project.propertyType}`);
    }
  
    if (
      preference.budgetMax &&
      project.priceMin &&
      project.priceMin <= preference.budgetMax
    ) {
      score += 15;
      reasons.push("Fits within your budget range");
    } else {
      tradeoffs.push("May stretch your preferred budget");
    }
  
    if (
      preference.priorities?.includes("Schools") ||
      preference.schoolsRequired
    ) {
      const schoolCount =
        project.nearbySchools?.length || project.schools?.length || 0;
  
      if (schoolCount > 0) {
        score += 8;
        reasons.push("Good school access available");
      }
    }
  
    if (hasMatch(preference.priorities || [], "Appreciation")) {
      score += 5;
      reasons.push("Has appreciation potential based on available notes");
    }
  
    score = Math.min(score, 98);
  
    return {
      confidenceScore: score,
      financialFit: preference.budgetMax && project.priceMin <= preference.budgetMax ? 92 : 68,
      commuteFit: 82,
      lifestyleFit: score >= 80 ? 88 : 72,
      appreciationFit: 81,
      riskLevel: score >= 80 ? "Low" : score >= 65 ? "Medium" : "High",
      reasons,
      tradeoffs,
    };
  }
  
  module.exports = {
    calculateProjectScore,
  };