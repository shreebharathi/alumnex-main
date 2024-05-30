const express = require("express");
const router = express.Router();
const metricsController = require("../controllers/metrics.js"); // Adjust the path as necessary

// GET endpoint to retrieve all internships
router.get("/dashboard", metricsController.getAllTotalCounts);

module.exports = router;
