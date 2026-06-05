const { askAI } = require("../services/openai.service");
const { findMatchingProjects } = require("../services/recommendation.service");
const { buildProjectFallback } = require("../services/fallback.service");
const {
  ensureSession,
  saveMessage,
  updateSession,
} = require("../services/session.service");

exports.chat = async (req, res) => {
  try {
    const { message, history = [], sessionId } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        reply: "Message is required",
      });
    }

    const session = await ensureSession(sessionId, message);

    await saveMessage(session._id, "user", message);

    const projects = await findMatchingProjects(message);

    let reply;

    try {
      reply = await askAI({
        userMessage: message,
        history,
        projects,
      });
    } catch (aiError) {
      console.error("AI fallback:", aiError.message);
      reply = buildProjectFallback(projects);
    }

    await saveMessage(session._id, "assistant", reply);
    await updateSession(session._id, reply.slice(0, 80));

    res.status(200).json({
      success: true,
      sessionId: session._id,
      reply,
      projects,
    });
  } catch (error) {
    console.error("Chat error:", error);

    res.status(500).json({
      success: false,
      reply: error.message || "ARKHA failed to process this request.",
    });
  }
};