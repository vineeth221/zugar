function formatPrice(value) {
  if (!value) return "N/A";
  return `₹${(value / 10000000).toFixed(2)} Cr`;
}

function buildProjectFallback(projects = []) {
  if (!projects.length) {
    return "I could not find matching projects in the database yet. Add more project data and try again.";
  }

  return `
# ARKHA Shortlist

AI explanation is temporarily unavailable, but I found these matching projects from the database:

${projects
  .map(
    (p) => `
## ${p.name}

- **Builder:** ${p.builder}
- **Location:** ${p.location}
- **Type:** ${p.propertyType}
- **Price:** ${formatPrice(p.priceMin)} - ${formatPrice(p.priceMax)}
- **Possession:** ${p.possession || "N/A"}
`
  )
  .join("\n")}
`;
}

module.exports = {
  buildProjectFallback,
};