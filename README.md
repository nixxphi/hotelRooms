# hotelRooms
Learnable task X
---

# Hotel Rooms Management System

This project is a Hotel Rooms Management System built with Node.js, Express.js, and MongoDB. It provides a backend API for managing rooms and room types in a hotel.

## Features

- Create, read, update, and delete (CRUD) operations for rooms and room types
- Fetch rooms with optional filters (search, room type, price range)
- Error handling middleware for handling server errors gracefully
- Environment configuration using dotenv for managing environment variables
- Integration with MongoDB database

## Installation

1. Start the server:

   ```bash
   npm start
   ```

## Usage

### API Endpoints

- **Create Room Type**: `POST /api/v1/rooms-types`
- **Fetch All Room Types**: `GET /api/v1/rooms-types`
- **Create Room**: `POST /api/v1/rooms`
- **Fetch All Rooms**: `GET /api/v1/rooms`
  - Optional Filters: `search`, `roomType`, `minPrice`, `maxPrice`
- **Fetch Room by ID**: `GET /api/v1/rooms/:id`
- **Update Room by ID**: `PATCH /api/v1/rooms/:id`
- **Delete Room by ID**: `DELETE /api/v1/rooms/:id`

### Testing

To run tests, use the following command:

```bash
npm test
```
