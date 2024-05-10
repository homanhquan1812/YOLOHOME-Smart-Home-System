const express = require('express');
const router = express.Router();
const dashboardController = require('../app/controllers/DashboardController');

router.get('/', dashboardController.dashboard)
router.post('/', dashboardController.updateled);

module.exports = router;