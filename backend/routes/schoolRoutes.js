const express = require('express');
const router = express.Router();
const db = require('../config/pool'); 
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
router.post('/addSchool', upload.single('image'), async (req, res) => {
  const { name, address, city, state, contact, email_id } = req.body;
  const image = req.file ? req.file.filename : null; // Ensure image is present

  // Ensure all required fields are provided
  if (!name || !address || !city || !state || !contact || !email_id || !image) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const query = 'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
  try {
    const [result] = await db.execute(query, [name, address, city, state, contact, image, email_id]);
    res.status(201).json({ message: 'School added successfully', schoolId: result.insertId });
  } catch (err) {
    console.error('Error adding school:', err);
    return res.status(500).json({ message: 'Error adding school' });
  }
});

// Get all schools
router.get('/getSchools', async (req, res) => {
  const query = 'SELECT * FROM schools';
  try {
    const [results] = await db.execute(query);
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching schools:', err);
    return res.status(500).json({ message: 'Error fetching schools' });
  }
});

module.exports = router;
