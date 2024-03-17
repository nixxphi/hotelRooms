const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const roomTypeRouter = require('./src/routes/roomTypeRouter');
const roomRouter = require('./src/routes/roomRouter'); // Adjust the path as necessary
const roomTypeController = require('./src/controllers/roomTypeController');
const roomController = require('./src/controllers/roomController'); // Adjust the path as necessary
const errorHandler = require('./src/errorHandler');
const apiKeyValidator = require('./src/validations/api-key-validator');
const logger = require('./src/utils/logger');


// LOAD ENVIRONMENT VARIABLES FROM .ENV FILE
dotenv.config();

// CREATING EXPRESS APP
const app = express();

// INCLUDE CORS
app.use(cors());

// MIDDLEWARE
app.use(bodyParser.json());

// MIDDLEWARE TO VALIDATE API KEY FOR ALL ROUTES
app.use(apiKeyValidator);

// LOGGER MIDDLEWARE
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// MONGODB CONNECTION
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  logger.info('Connected to MongoDB');
})
.catch((error) => {
  logger.error('Error connecting to MongoDB:', error);
});

// ROUTES
app.use('/api/v1', roomTypeRouter);
app.use('/api/v1/rooms', roomRouter);

// ERROR HANDLING MIDDLEWARE
app.use(errorHandler);

// STARTING THE SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`Server listening on port ${PORT}`);
});
