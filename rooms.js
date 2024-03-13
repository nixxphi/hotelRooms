const express = require('express');
const router = express.Router();
const Room = require('../models/Room');

// POST endpoint for creating a new room
router.post('/', async (req, res) => {
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

// GET endpoint for fetching all rooms with filters
router.get('/', async (req, res) => {
  try {
    let query = {};
    if (req.query.search) {
      query.name = { $regex: req.query.search, $options: 'i' };
    }
    if (req.query.roomType) {
      query.roomType = req.query.roomType;
    }
    if (req.query.minPrice) {
      query.price = { $gte: req.query.minPrice };
    }
    if (req.query.maxPrice) {
      if (!query.price) query.price = {};
      query.price.$lte = req.query.maxPrice;
    }

    const rooms = await Room.find(query);
    res.status(200).json({ data: rooms });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
