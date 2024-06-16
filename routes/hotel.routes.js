const express = require('express');
const router = express.Router();
const hotels = require('../controllers/hotel.controller');

// Create a new Hotel
router.post('/hotels', hotels.create);

// Retrieve all Hotels
router.get('/hotels', hotels.findAll);

// Retrieve a single Hotel with id
router.get('/hotels/:id', hotels.findOne);

// Update a Hotel with id
router.put('/hotels/:id', hotels.update);

// Delete a Hotel with id
router.delete('/hotels/:id', hotels.delete);

// Search Hotels by name
router.get('/search', hotels.search);

module.exports = router;

