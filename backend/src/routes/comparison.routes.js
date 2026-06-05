const express = require("express");
const router = express.Router();

const { compareProjects } = require("../controllers/comparison.controller");

router.post("/", compareProjects);

module.exports = router;