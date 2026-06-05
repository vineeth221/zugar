const Preference = require("../models/Preference");
const Recommendation = require("../models/Recommendation");
const { findProjectsByPreference } = require("../services/preference-match.service");
const { calculateProjectScore } = require("../services/scoring.service");

exports.generateRecommendations = async (req, res) => {
  try {
    const { sessionId } = req.body;

    const preference = await Preference.findOne({ sessionId });

    if (!preference) {
      return res.status(400).json({
        success: false,
        message: "Preference not found for this session",
      });
    }

    const projects = await findProjectsByPreference(preference);

    await Recommendation.deleteMany({ sessionId });

    const recommendations = await Promise.all(
      projects.map(async (project) => {
        const score = calculateProjectScore(project, preference);

        return Recommendation.create({
          sessionId,
          projectId: project._id,
          ...score,
        });
      })
    );

    const populated = await Recommendation.find({ sessionId })
      .populate("projectId")
      .sort({ confidenceScore: -1 });

    res.json({
      success: true,
      preference,
      recommendations: populated,
    });
  } catch (error) {
    console.error("Recommendation error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getRecommendations = async (req, res) => {
  try {
    const recommendations = await Recommendation.find({
      sessionId: req.params.sessionId,
    })
      .populate("projectId")
      .sort({ confidenceScore: -1 });

    res.json({
      success: true,
      recommendations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};