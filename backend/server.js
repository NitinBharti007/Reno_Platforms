const express = require('express');
const cors = require('cors');
const schoolRoutes = require('./routes/schoolRoutes');
const path = require('path');
require('dotenv').config();

const app = express();

// Middlewares
// app.use(cors());
app.use(cors({
  origin: "https://reno-platforms.vercel.app", // Or specify the exact allowed origin
  methods: "GET,POST",
  allowedHeaders: "Content-Type"
}));

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use('/public', express.static(path.join(__dirname, 'public'))); // Serving images

// API Routes
app.use('/api', schoolRoutes);

const port = 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
