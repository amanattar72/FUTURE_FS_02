const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');
const auth = require('../middleware/authMiddleware');

// For demo purposes, removing auth temporarily to show data
router.post('/', leadController.createLead);
router.get('/', leadController.getLeads); // Removed auth
router.get('/:id', leadController.getLead); // Removed auth
router.put('/:id', auth, leadController.updateLead);
router.delete('/:id', auth, leadController.deleteLead);
router.post('/:id/notes', auth, leadController.addNote);

module.exports = router;