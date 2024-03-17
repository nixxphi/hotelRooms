const mongoose = require('mongoose');

// Defining rooms
const roomTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  capacity: {
    type: Number
  },
  beds: {
    type: Number
  },
  price: {
    type: Number,
  },
  amenities: {
    type: [String],
    default: []
  },
  image: {
    type: String,
    default: 'room.jpg'
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
});

// Creating the RoomType model using the roomTypeSchema
const RoomType = mongoose.model('RoomType', roomTypeSchema);

module.exports = RoomType;
