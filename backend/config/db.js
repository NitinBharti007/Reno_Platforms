const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Planet!163',
  database: 'school_management',
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
