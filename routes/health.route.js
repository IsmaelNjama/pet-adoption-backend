const express = require("express");

const healthController = require("../controllers/health.controller");

const router = express.Router();

// Detailed health check endpoint with database connectivity verification
router.get("/", healthController.healthCheck);

// Simple liveness check that always returns 200 OK
router.get("/liveness", healthController.livenessCheck);

module.exports = router;
