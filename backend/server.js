const express = require('express');
const cors = require('cors');
const schoolRoutes = require('./routes/schoolRoutes');
const path = require('path');
const db = require('./config/db'); // Import the database configuration
require('dotenv').config(); // Add this line at the top


const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use('/public', express.static(path.join(__dirname, 'public'))); // Serving images

// API Routes
app.use('/api', schoolRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
