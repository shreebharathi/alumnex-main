const express = require('express');
const router = express.Router();
const eventController = require('../controllers/events');  // Adjust the path as necessary

// POST endpoint to create a new event
router.post('/', eventController.createEvent);

// GET endpoint to retrieve all events
router.get('/all', eventController.getAllEvents);

// GET endpoint to retrieve a single event by ID
router.get('/:id', eventController.getEvent);

// PATCH endpoint to update an existing event
router.patch('/:id', eventController.updateEvent);

// DELETE endpoint to delete an event
router.delete('/:id', eventController.deleteEvent);

module.exports = router;
