// Import database configuration after dotenv
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const schoolRoutes = require('./routes/schoolRoutes');
const path = require('path');
const db = require('./config/pool');

const app = express();

// CORS configuration for frontend and backend communication
const corsOptions = {
  origin: 'https://reno-platforms.vercel.app/', // Update with your frontend URL
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
};

// Middlewares
app.use(cors(corsOptions));  // Enable CORS for specific origins
app.use(express.json());     // Parse JSON payload
app.use(express.urlencoded({ extended: true }));  // Parse URL encoded data
app.use('/public', express.static(path.join(__dirname, 'public')));  // Serve static files

// API Routes
app.use('/api', schoolRoutes);  // Add your routes here

// Start the server
const port = process.env.PORT || 5000;  // Use the port from the environment or default to 5000
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
