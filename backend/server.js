// Import database configuration after dotenv
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const schoolRoutes = require('./routes/schoolRoutes');
const path = require('path');
const db = require('./config/pool');

const app = express();

const corsOptions = {
  origin: 'https://reno-platforms.onrender.com/', // Replace with your frontend URL
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api', schoolRoutes);

// Start server
const port = process.env.PORT || 5000; // Default to 5000 if not specified in environment variables
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
