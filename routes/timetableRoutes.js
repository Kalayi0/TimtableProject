// Import necessary modules and controllers
const express = require('express');
const router = express.Router();
const timetableController = require('../controllers/api/timetableController');

// Define the routes for timetable operations
router.post('/generate', timetableController.createTimetableEntry);
router.delete('/delete', timetableController.deleteTimetableEntry);
router.get('/view', timetableController.getTimetableEntry);

// Export the router
module.exports = router;
