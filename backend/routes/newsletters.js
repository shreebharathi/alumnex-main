const express = require('express');
const router = express.Router();
const newsletterController = require('../controllers/newsletters');  // Adjust the path as necessary

// POST endpoint to create a new newsletter
router.post('/', newsletterController.createNewsletter);

// GET endpoint to retrieve all newsletters
router.get('/all', newsletterController.getAllNewsletters);

// GET endpoint to retrieve a single newsletter by ID
router.get('/:id', newsletterController.getNewsletter);

// PATCH endpoint to update an existing newsletter
router.patch('/:id', newsletterController.updateNewsletter);

// DELETE endpoint to delete a newsletter
router.delete('/:id', newsletterController.deleteNewsletter);

module.exports = router;
