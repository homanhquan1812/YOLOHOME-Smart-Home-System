const express = require('express');
const router = express.Router();
const dashboardController = require('../app/controllers/DashboardController');

router.get('/', dashboardController.smartdoor)
router.post('/', dashboardController.enterkey);

module.exports = router;