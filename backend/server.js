require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
// const nodemailer = require('nodemailer');
const { body, validationResult } = require('express-validator');

// Initialize Express app
const app = express();

// ======================
// Security Middlewares
// ======================
app.use(helmet());
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    'https://little-lemon-frontend-mhxf.onrender.com'// Will update after frontend deploy
  ],
  credentials: true
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again later'
});
app.use(limiter);
app.use(express.json({ limit: '10kb' }));

// ======================
// Database Connection
// ======================
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// ======================
// Updated Data Model
// ======================
const Reservation = mongoose.model('Reservation', {
  date: { type: String, required: true },
  time: { type: String, required: true },
  diningArea: { type: String, required: true },
  seats: { type: Number, required: true, min: 1, max: 12 },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  contactMethod: { type: String, required: true },
  email: { 
    type: String,
    required: false,
    default: 'no-email@example.com',
    validate: {
      validator: function(v) {
        // Skip validation if empty (will use default)
        if (!v || v.trim() === "") return true;
        // Validate actual emails
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: 'Invalid email format'
    }
  },
  phone: {
    type: String,
    required: false,
    default: '0000000000',
    validate: {
      validator: function(v) {
        // Skip validation if empty (will use default)
        if (!v || v.trim() === "") return true;
        // Validate actual phone numbers
        return v.replace(/\D/g, '').length === 10;
      },
      message: 'Phone must be 10 digits'
    }
  },
  createdAt: { type: Date, default: Date.now },

  // Automatic Deletion Attempt
  expireAt: { 
    type: Date,
    default: function() {
      // Calculate expiration time (reservation time + 2 hours buffer)
      const [year, month, day] = this.date.split('-').map(Number);
      const [hours, minutes] = this.time.split(':').map(Number);
      const reservationTime = new Date(year, month - 1, day, hours, minutes);
      return new Date(reservationTime.getTime() + 2 * 60 * 60 * 1000); // 2 hr buffer (data deleted aftr 2hrs reservation time)
    }
  }
});

// Creating TTL index for automatic expiration
Reservation.schema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

// ======================
// Email Configuration
// ======================
// const transporter = nodemailer.createTransport({
//   service: process.env.EMAIL_SERVICE || 'Gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS
//   }
// });

// ======================
// API Endpoints
// ======================
app.post('/api/reservations', [
  body('date').isDate(),
  body('time').matches(/^([01]\d|2[0-3]):([0-5]\d)$/),
  body('seats').isInt({ min: 1, max: 12 }),
  body('firstName').trim().notEmpty(),
  body('lastName').trim().notEmpty(),
//   body('email').optional().isEmail().normalizeEmail(),
  body('email').optional().customSanitizer(v => {
    // Convert empty string to null, but schema will use default 'no-email@example.com'
    return v && v.trim() !== "" ? v : null;
  }),

  body('phone').optional().customSanitizer(v => {
    // Convert empty string to null, but schema will use default 0000000000
    return v && v.trim() !== "" ? v.replace(/\D/g, '') : null;
  })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Determine contact method and sanitize data
    const contactMethod = req.body.contactMethod || (req.body.email ? 'email' : 'phone');
    
    const sanitizedData = {
      ...req.body,
      contactMethod,
      // Ensure phone is properly sanitized or defaults to '0000000000'
      phone: req.body.phone && req.body.phone.trim() !== "" 
        ? req.body.phone.replace(/\D/g, '') 
        : '',
      // Set email to null if not provided
      email: req.body.email && req.body.email.trim() !== "" 
        ? req.body.email 
        : ''
    };

    const reservation = new Reservation(sanitizedData);
    await reservation.save();
    
    // Send email only if email was provided and contact method is email
    // if (req.body.email && contactMethod === 'email') {
    //   await transporter.sendMail({
    //     from: process.env.EMAIL_FROM || 'Little Lemon <reservations@littlelemon.com>',
    //     to: req.body.email,
    //     subject: process.env.EMAIL_SUBJECT || 'Reservation Confirmed!',
    //     html: `
    //       <h1>Your Reservation is Confirmed!</h1>
    //       <p><strong>Booking ID:</strong> ${reservation._id}</p>
    //       <p><strong>Date:</strong> ${req.body.date}</p>
    //       <p><strong>Time:</strong> ${req.body.time}</p>
    //       <p><strong>Party Size:</strong> ${req.body.seats}</p>
    //       <p><strong>Location:</strong> ${req.body.diningArea}</p>
    //     `
    //   });
    // }

    res.status(201).json(reservation);
  } catch (error) {
    console.error('Reservation error:', error);
    res.status(500).json({ 
      error: 'Failed to create reservation',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Check reservations
app.get('/api/reservations', async (req, res) => {
  try {
    const { email, phone } = req.query;
    
    if (!email && !phone) {
      return res.status(400).json({ error: 'Email or phone required' });
    }

    const query = {};
    // Add this to the GET endpoint's query building:
    if (email) {
    query.email = email === 'no-email@example.com' ? 'no-email@example.com' : email;
    }
    if (phone) {
      // Handle default phone number in queries
      const cleanPhone = phone.replace(/\D/g, '');
      query.phone = cleanPhone === '0000000000' ? '0000000000' : cleanPhone;
    }

    const reservations = await Reservation.find(query)
      .sort({ createdAt: -1 })
      .limit(10);

    res.json(reservations);
  } catch (error) {
    console.error('Lookup error:', error);
    res.status(500).json({ error: 'Failed to fetch reservations' });
  }
});

// Delete reservation
app.delete('/api/reservations/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid reservation ID' });
    }

    const deletedReservation = await Reservation.findByIdAndDelete(id);
    
    if (!deletedReservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    res.json({ 
      success: true,
      message: 'Reservation cancelled successfully',
      reservation: deletedReservation
    });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Failed to cancel reservation' });
  }
});

// ======================
// Error Handling
// ======================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// ======================
// Server Startup
// ======================
const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on('SIGTERM', () => {
  server.close(() => {
    mongoose.connection.close(false, () => {
      console.log('Server closed');
      process.exit(0);
    });
  });
});