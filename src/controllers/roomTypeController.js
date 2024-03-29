const RoomType = require('./RoomType');

// Controller function for creating a new room type
const createRoomType = async (req, res) => {
  try {
    const { name, description, capacity, beds, price, amenities, image, isAvailable } = req.body;
    // Validate request parameters. I'm gonna copy and paste this all over the place.
   if (!name || !description || !capacity || !beds || !price) {
    return res.status(400).json({ message: 'Missing required fields' });
  };
    
    const newRoomType = new RoomType({ name, description, capacity, beds, price, amenities, image, isAvailable });
    await newRoomType.save();
    
    res.status(201).json({ message: 'Room type created successfully', data: newRoomType });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function for fetching all room types
const getAllRoomTypes = async (req, res) => {
  try {
    const roomTypes = await RoomType.find();
    res.status(200).json({ data: roomTypes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function for fetching a single room type by ID
const getRoomTypeById = async (req, res) => {
  try {
    const roomType = await RoomType.findById(req.params.id);
    if (!roomType) {
      return res.status(404).json({ message: 'Room type not found' });
    }
    res.status(200).json({ data: roomType });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function for updating a room type by ID
const updateRoomTypeById = async (req, res) => {
  try {
    const { name, description, capacity, beds, price, amenities, image, isAvailable } = req.body;

    // Validate request parameters. The user is expected to fill in all details at this point but creating a room only requires a name and price.
    if (!name || !description || !capacity || !beds || !price) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const updatedRoomType = await RoomType.findByIdAndUpdate(
      req.params.id,
      { name, description, capacity, beds, price, amenities, image, isAvailable },
      { new: true }
    );
    
    if (!updatedRoomType) {
      return res.status(404).json({ message: 'Room type not found' });
    }
    res.status(200).json({ message: 'Room type updated successfully', data: updatedRoomType });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller function for deleting a room type by ID
const deleteRoomTypeById = async (req, res) => {
  try {
    const deletedRoomType = await RoomType.findByIdAndDelete(req.params.id);
    if (!deletedRoomType) {
      return res.status(404).json({ message: 'Room type not found' });
    }
    res.status(200).json({ message: 'Room type deleted successfully', data: deletedRoomType });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { createRoomType, getAllRoomTypes, getRoomTypeById, updateRoomTypeById, deleteRoomTypeById };
