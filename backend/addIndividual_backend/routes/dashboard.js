// backend/addindividualbackend/routes/dashboard.js
const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardControllers');

// GET /api/dashboard/statistics
router.get('/statistics', dashboardController.getDashboardStatistics);

module.exports = router;