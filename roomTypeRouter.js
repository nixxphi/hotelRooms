const express = require('express');
const router = express.Router();
const RoomType = require('../RoomType');
const roomTypeController = require('../roomTypeController');

// POST endpoint for creating room types
router.post('/api/v1/rooms', async (req, res) => {
  try {
    const { name, roomType, price } = req.body;
    const newRoom = new Room({ name, roomType, price });
    await newRoom.save();
    res.status(201).json({ message: 'Room created successfully', data: newRoom });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET endpoint for fetching all room types
router.get('/api/v1/rooms-types', async (req, res) => {
  try {
    const roomTypes = await RoomType.find();
    res.status(200).json({ data: roomTypes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/api/v1/room-types', roomTypeController.createRoomType);

router.get('/api/v1/room-types', roomTypeController.getAllRoomTypes);

router.get('/api/v1/room-types/:id', roomTypeController.getRoomTypeById);

router.patch('/api/v1/room-types/:id', roomTypeController.updateRoomTypeById);

router.delete('/api/v1/room-types/:id', roomTypeController.deleteRoomTypeById);

module.exports = router;
