const Preference = require("../models/Preference");
const { ensureSession } = require("../services/session.service");

exports.savePreference = async (req, res) => {
  try {
    const { sessionId, preference } = req.body;

    const session = await ensureSession(sessionId, "Home preference intake");

    const savedPreference = await Preference.findOneAndUpdate(
      { sessionId: session._id },
      {
        ...preference,
        sessionId: session._id,
        rawInput: preference,
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      sessionId: session._id,
      preference: savedPreference,
    });
  } catch (error) {
    console.error("Preference error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getPreferenceBySession = async (req, res) => {
  try {
    const preference = await Preference.findOne({
      sessionId: req.params.sessionId,
    });

    res.json({
      success: true,
      preference,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};