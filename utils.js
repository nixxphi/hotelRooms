// ASYNC HANDLER FOR EVENTS
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// HERE'S THE ERROR HANDLER
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
};

// OBJECT ID VALIDATOR. 
const validateObjectId = (id) => {
  const ObjectId = require('mongoose').roomTypeId;
  return ObjectId.isValid(id);
};

module.exports = {
  asyncHandler,
  errorHandler,
  validateObjectId
};
