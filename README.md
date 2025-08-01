# Little Lemon Restaurant

This project was developed as part of the Meta Front-End Developer Capstone Project.  
It is a full-stack restaurant reservation application built using React for the frontend and MongoDB + Express for the backend.

## Project Overview

Little Lemon Restaurant is a modern single-page application (SPA) that allows users to:

- View About, Special Seasonal Menu, and Customer Reviews sections
- Browse the full menu
- Make a table reservation
- Check their existing reservations
- Delete a reservation if needed

All reservation data is handled via RESTful API calls and persisted in MongoDB using Mongoose.

## Features

- Responsive and interactive React frontend
- Express.js backend with secure middleware including Helmet and CORS
- Input validation using express-validator
- Reservation records stored in MongoDB
- Reservations auto-expire 2 hours after their scheduled time using MongoDB TTL indexing
- Environment variables used for security and sensitive configuration

---
s
## Technology Stack

- **Frontend**: React, JSX, CSS Modules
- **Backend**: Express.js, Node.js
- **Database**: MongoDB with Mongoose
- **Validation**: express-validator
- **Security**: Helmet, CORS, express-rate-limit

---

## Auto-Expiration of Reservations

Reservations are set to **automatically expire two hours after the scheduled time**. This is managed using:

- MongoDB's **TTL (Time-To-Live) index**, or
- A **server-side cleanup** function that removes outdated entries.

This keeps the reservation system clean and performant.

---

## API Endpoints

All API routes are prefixed with `/api/reservations`.

### POST /api/reservations

Creates a new reservation.
Example request body:

```json
{
  "date": "2025-08-01",
  "time": "18:00",
  "diningArea": "Patio",
  "seats": 4,
  "firstName": "John",
  "lastName": "Doe",
  "contactMethod": "email",
  "email": "john@gmail.com",
  "phone": ""
}
OR
{
  "date": "2025-08-01",
  "time": "18:00",
  "diningArea": "Patio",
  "seats": 4,
  "firstName": "Jane",
  "lastName": "Smith",
  "contactMethod": "email",
  "email": "",
  "phone": "1234567890"
}

### `GET /api/reservations?email=john@example.com`  
### `GET /api/reservations?phone=1234567890`  
Returns the most recent reservations associated with the provided email or phone number (up to 10 entries).

### `DELETE /api/reservations/:id` *(optional)*  
This delete a reservation using its MongoDB Object ID.
