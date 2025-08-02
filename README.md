# Little Lemon Restaurant

This project was developed as part of the Meta Front-End Developer Capstone Project.  
It is a full-stack restaurant reservation application built using React for the frontend and Express + MongoDB for the backend.

## Visit the Application

[Live Demo](https://little-lemon-2hrf.onrender.com/)
https://little-lemon-2hrf.onrender.com/
## Important Note About Loading Time

This project is hosted on [Render](https://render.com) using their **free tier** service.
As a result:
- The backend server goes to **sleep after periods of inactivity**.
- When visiting the site for the **first time** or after it has been idle, it may take **1–2 minutes** for the server to wake up and respond.
- During this time, actions like **submitting a reservation or checking existing ones may seem unresponsive** — this is expected.
- Once the server is awake, all features will work smoothly and respond quickly.

> Please be patient during the initial load — this delay happens only once after the server has been asleep.
Thank you for your understanding!

## Project Overview

Little Lemon Restaurant is a modern single-page application (SPA) that allows users to:

- View About, Seasonal Specials, and Customer Reviews sections
- Browse the full restaurant menu
- Make a table reservation
- Look up their existing reservations
- Cancel a reservation if needed

## Features

- Responsive, accessible, and interactive React frontend
- Backend built with Express.js and Node.js
- MongoDB database for storing and managing reservations
- Input validation and basic request rate limiting
- Reservations are automatically removed after expiration to keep the database clean
- Secure headers and CORS handling via middleware

## Technology Stack

- **Frontend**: React, JSX, CSS Modules
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Validation**: express-validator
- **Security**: Helmet, CORS, express-rate-limit
- **Deployment**: Render.com (for both frontend and backend)

## Key Implementation Details

- Reservations include fields like date, time, guest name, dining area, and contact method
- Users can search for their reservations using either email or phone number
- The backend uses MongoDB’s TTL (Time-To-Live) indexing to auto-delete expired reservations
- Middleware is used for request validation and securing HTTP headers
- Environment variables are used to store sensitive config values (e.g., DB URI, server port)

## Developer Notes

This project demonstrates how front-end and back-end technologies can be integrated into a seamless full-stack application. It emphasizes:

- Component-based architecture and state management in React
- RESTful routing and middleware in Express
- Database modeling with Mongoose
- Best practices for deployment and security in modern web apps