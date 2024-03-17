const Room = require('../models/Room');

// Controller functions for managing rooms
const roomController = {
  // Creating rooms
  async createRoom(req, res) {
    try {
      const { name, roomType, price } = req.body;
      const newRoom = new Room({ name, roomType, price });
      await newRoom.save();
      res.status(201).json({ message: 'Room created successfully', data: newRoom });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // for fetching all rooms
  async getAllRooms(req, res) {
    try {
      const rooms = await Room.find();
      res.status(200).json({ data: rooms });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // for fetching a single room by ID
  async getRoomById(req, res) {
    try {
      const room = await Room.findById(req.params.id);
      if (!room) {
        return res.status(404).json({ message: 'Room not found' });
      }
      res.status(200).json({ data: room });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // for updating a room by ID
  async updateRoomById(req, res) {
    try {
      const { name, price } = req.body;
      const updatedRoom = await Room.findByIdAndUpdate(
        req.params.id,
        { name, price },
        { new: true }
      );
      if (!updatedRoom) {
        return res.status(404).json({ message: 'Room not found' });
      }
      res.status(200).json({ message: 'Room updated successfully', data: updatedRoom });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // for deleting a room by ID
  async deleteRoomById(req, res) {
    try {
      const deletedRoom = await Room.findByIdAndDelete(req.params.id);
      if (!deletedRoom) {
        return res.status(404).json({ message: 'Room not found' });
      }
      res.status(200).json({ message: 'Room deleted successfully', data: deletedRoom });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

module.exports = roomController;
