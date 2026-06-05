const Project = require("../models/Project");
const Comparison = require("../models/Comparison");

exports.compareProjects = async (req, res) => {
  try {
    const { sessionId, projectIds } = req.body;

    if (!sessionId || !projectIds?.length) {
      return res.status(400).json({
        success: false,
        message: "sessionId and projectIds are required",
      });
    }

    const projects = await Project.find({
      _id: { $in: projectIds },
    }).lean();

    const comparison = projects.map((project) => ({
      projectId: project._id,
      name: project.name,
      builder: project.builder,
      location: project.location,
      price: `${project.priceMin} - ${project.priceMax}`,
      schools: project.nearbySchools?.length || project.schools?.length || 0,
      hospitals: project.nearbyHospitals?.length || project.hospitals?.length || 0,
      possession: project.possession,
      riskLevel: "Low",
      overallFit: 85,
    }));

    const saved = await Comparison.create({
      sessionId,
      projectIds,
      comparison,
    });

    res.json({
      success: true,
      comparison: saved.comparison,
    });
  } catch (error) {
    console.error("Comparison error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};