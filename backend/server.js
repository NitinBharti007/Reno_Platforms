const db = require('./config/db'); // Import database config after dotenv
const express = require('express');
const cors = require('cors');
const schoolRoutes = require('./routes/schoolRoutes');
const path = require('path');
require('dotenv').config(); // Load environment variables


const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api', schoolRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});