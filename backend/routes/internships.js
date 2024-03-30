const express = require('express');
const router = express.Router();
const internshipController = require('../controllers/internships');  // Adjust the path as necessary

// POST endpoint to create a new internship
router.post('/', internshipController.createInternship);

// GET endpoint to retrieve all internships
router.get('/all', internshipController.getAllInternships);

// GET endpoint to retrieve a single internship by ID
router.get('/:id', internshipController.getInternship);

// PATCH endpoint to update an existing internship
router.patch('/:id', internshipController.updateInternship);

// DELETE endpoint to delete an internship
router.delete('/:id', internshipController.deleteInternship);

module.exports = router;
