const express = require("express");
const router = express.Router();

const { getInsights } = require("../controllers/insight.controller");

router.get("/", getInsights);

module.exports = router;