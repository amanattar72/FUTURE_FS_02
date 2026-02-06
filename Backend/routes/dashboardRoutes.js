const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const auth = require('../middleware/authMiddleware');

// Removed auth for demo purposes
router.get('/stats', dashboardController.getStats);

module.exports = router;