const { Pool } = require('pg');  // PostgreSQL client
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
});

pool.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Database connected!');
  }
});

module.exports = pool;


// CREATE DATABASE school_management;

// USE school_management;

// CREATE TABLE schools (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   name VARCHAR(255),
//   address TEXT,
//   city VARCHAR(100),
//   state VARCHAR(100),
//   contact VARCHAR(20),
//   email_id VARCHAR(100),
//   image VARCHAR(255)
// );
