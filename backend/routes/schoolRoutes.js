const express = require('express');
const router = express.Router();
const db = require('../config/pool'); // Assuming pool is the configured database connection
const multer = require('multer');
const path = require('path');

// Setup multer storage for handling image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/schoolImages/'); // Ensure the folder exists on the server
  },
  filename: (req, file, cb) => {
    // Use current timestamp to ensure unique filenames for uploaded files
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Add new school
router.post('/addSchool', upload.single('image'), (req, res) => {
  const { name, address, city, state, contact, email_id } = req.body;
  const image = req.file ? req.file.filename : null; // Ensure image is present

  // Ensure all required fields are provided
  if (!name || !address || !city || !state || !contact || !email_id || !image) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const query = 'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [name, address, city, state, contact, image, email_id], (err, result) => {
    if (err) {
      console.error('Error adding school:', err);
      return res.status(500).json({ message: 'Error adding school' });
    }
    res.status(201).json({ message: 'School added successfully', schoolId: result.insertId });
  });
});

// Get all schools
router.get('/getSchools', (req, res) => {
  const query = 'SELECT * FROM schools';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching schools:', err);
      return res.status(500).json({ message: 'Error fetching schools' });
    }
    res.status(200).json(results);
  });
});

module.exports = router;
