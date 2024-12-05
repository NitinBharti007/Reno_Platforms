const express = require('express');
const router = express.Router();
const db = require('../config/db');
const multer = require('multer');
const path = require('path');

// Setup multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/schoolImages/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Add new school
router.post('/addSchool', upload.single('image'), async (req, res) => {
  const { name, address, city, state, contact, email_id } = req.body;
  const image = req.file ? req.file.filename : null; // Handle image upload

  if (!image) {
    return res.status(400).json({ message: 'Image is required' });
  }

  const query = 'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
  
  try {
    // Use async query with mysql2/promise
    const [result] = await db.query(query, [name, address, city, state, contact, image, email_id]);
    res.status(201).json({ message: 'School added successfully', schoolId: result.insertId });
  } catch (err) {
    console.error('Error adding school:', err);
    res.status(500).json({ message: 'Error adding school', error: err.message });
  }
});

// Get all schools
router.get('/getSchools', async (req, res) => {
  const query = 'SELECT * FROM schools';
  
  try {
    // Use async query with mysql2/promise
    const [results] = await db.query(query);
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching schools:', err);
    res.status(500).json({ message: 'Error fetching schools', error: err.message });
  }
});

module.exports = router;
