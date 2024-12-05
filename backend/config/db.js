const mysql = require('mysql2/promise');

// Database connection pool
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});


db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Database connected!');
  }
});

module.exports = db;



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
