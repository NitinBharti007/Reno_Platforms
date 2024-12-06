require('dotenv').config();
const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true, // Allow the pool to wait for connections to be available
  connectionLimit: 10,      // Max number of connections the pool can have
  queueLimit: 0             // No limit on the number of queued connections
});

// Create a promise-based wrapper around the pool
const promisePool = pool.promise(); // This returns a pool that returns promises

module.exports = promisePool;


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
