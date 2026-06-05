const express = require("express");
const router = express.Router();

const {
  savePreference,
  getPreferenceBySession,
} = require("../controllers/preference.controller");

router.post("/", savePreference);
router.get("/:sessionId", getPreferenceBySession);

module.exports = router;