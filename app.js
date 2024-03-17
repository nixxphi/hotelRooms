const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const roomTypeRouter = require('./src/routes/roomTypeRouter');
const roomRouter = require('./roomRouter');
const errorHandler = require('./errorHandler');
const apiKeyValidator = require('./src/validations/api-key-validator');

// LOAD ENVIRONMENT VARIABLES FROM .ENV FILE
dotenv.config();

// CREATING EXPRESS APP
const app = express();

// INCLUDE CORS
app.use(cors());

// MIDDLEWARE
app.use(bodyParser.json());


// Middleware to validate API key for all routes
app.use(apiKeyValidator);

// Example route
app.get('/api/resource', (req, res) => {
  res.json({ message: 'Access granted' });
});

// MONGODB CONNECTION
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

// ROUTES
app.use('/api/v1', roomTypeRouter);

// ERROR HANDLING MIDDLEWARE
app.use(errorHandler);

// STARTING THE SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
