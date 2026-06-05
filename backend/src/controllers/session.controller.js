const Session = require("../models/Session");
const Message = require("../models/Message");

exports.getSessions = async (req, res) => {
  try {
    const sessions = await Session.find().sort({ updatedAt: -1 });

    res.json({
      success: true,
      sessions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.createSession = async (req, res) => {
  try {
    const session = await Session.create({
      title: req.body.title || "New ARKHA Session",
    });

    res.status(201).json({
      success: true,
      session,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getSessionMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      sessionId: req.params.sessionId,
    }).sort({ createdAt: 1 });

    res.json({
      success: true,
      messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};