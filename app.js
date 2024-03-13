// Importing necessary modules
const app = express();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const roomTypeRouter = require('./roomTypeRouter');
const roomRouter = require('./roomRouter');
const errorHandler = require('./errorHandler');

// Load environment variables from .env file
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(bodyParser.json());
// MongoDB connection
mongoose.connect('mongodb+srv://nixxphi:this.is.the@redcluster.pixh5su.mongodb.net/?retryWrites=true&w=majority&appName=Redcluster', {
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

// Starting the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
