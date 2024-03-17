const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const { asyncHandler } = require('../utils');

// POST endpoint for creating a new room
router.post('/api/v1/rooms', asyncHandler(roomController.createRoom));

// GET endpoint for fetching all rooms
router.get('/api/v1/rooms', asyncHandler(roomController.getAllRooms));

// GET endpoint for fetching a single room by ID
router.get('/api/v1/rooms/:id', asyncHandler(roomController.getRoomById));

// PATCH endpoint for updating a room by ID
router.patch('/api/v1/rooms/:id', asyncHandler(roomController.updateRoomById));

// DELETE endpoint for deleting a room by ID
router.delete('/api/v1/rooms/:id', asyncHandler(roomController.deleteRoomById));

module.exports = router;
