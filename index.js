// Importing necessary modules
const express = require('express');
const mongoose = require('mongoose');
const roomTypeRouter = require('./roomTypeRouter');
const errorHandler = require('./errorHandler');
const rooms = require('./rooms');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/hotel_management', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Middleware
app.use(express.json());

// Routes
app.use('/api/v1', roomTypeRouter);

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
