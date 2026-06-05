const Insight = require("../models/Insight");

exports.getInsights = async (req, res) => {
  try {
    const insights = await Insight.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      insights,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};