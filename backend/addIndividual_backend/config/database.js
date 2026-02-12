// const mysql = require('mysql2');
// require('dotenv').config();

// const connection = mysql.createConnection({
//   host: process.env.DB_HOST || 'localhost',
//   user: process.env.DB_USER || 'kebele_system',
//   password: process.env.DB_PASSWORD || 'kebele_system',
//   database: process.env.DB_NAME || 'kebele_system',
//    waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// });

// connection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL:', err);
//     return;
//   }
//   console.log('Connected to MySQL database');
// });

// module.exports = connection;



// config/database.js
const mysql = require('mysql2');

// Create a connection POOL (not single connection)
const pool = mysql.createPool({
    host: 'localhost',
    user: 'kebele_system',
    password: 'kebele_system', // Leave empty if no password
    database: 'kebele_system', // Your actual database name
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test the connection - use pool.getConnection() NOT connection.getConnection()
pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Database connection failed:', err.message);
    } else {
        console.log('✅ Database connected successfully!');
        connection.release(); // Release the connection back to the pool
    }
});

// Export the pool
module.exports = pool;


