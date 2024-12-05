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
router.post('/addSchool', upload.single('image'), (req, res) => {
  const { name, address, city, state, contact, email_id } = req.body;
  const image = req.file.filename;

  const query = 'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(query, [name, address, city, state, contact, image, email_id], (err, result) => {
    if (err) {
      console.error('Error adding school:', err);
      return res.status(500).json({ message: 'Error adding school' });
    }
    res.status(201).json({ message: 'School added successfully' });
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
