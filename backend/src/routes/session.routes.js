const express = require("express");
const router = express.Router();

const {
  getSessions,
  createSession,
  getSessionMessages,
} = require("../controllers/session.controller");

router.get("/", getSessions);
router.post("/", createSession);
router.get("/:sessionId/messages", getSessionMessages);

module.exports = router;