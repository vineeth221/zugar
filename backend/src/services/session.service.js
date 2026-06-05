const Session = require("../models/Session");
const Message = require("../models/Message");

async function ensureSession(sessionId, message) {
  if (sessionId) {
    return Session.findById(sessionId);
  }

  return Session.create({
    title: message.slice(0, 40),
    lastMessage: message,
  });
}

async function saveMessage(sessionId, role, content) {
  return Message.create({
    sessionId,
    role,
    content,
  });
}

async function updateSession(sessionId, lastMessage) {
  return Session.findByIdAndUpdate(
    sessionId,
    { lastMessage },
    { new: true }
  );
}

module.exports = {
  ensureSession,
  saveMessage,
  updateSession,
};