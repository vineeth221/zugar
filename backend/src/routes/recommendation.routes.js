const express = require("express");
const router = express.Router();

const {
  generateRecommendations,
  getRecommendations,
} = require("../controllers/recommendation.controller");

router.post("/generate", generateRecommendations);
router.get("/:sessionId", getRecommendations);

module.exports = router;