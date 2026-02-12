// // models/User.js
// const db = require('../config/database');
// const bcrypt = require('bcrypt');

// class User {
//     static async findByEmail(email) {
//         return new Promise((resolve, reject) => {
//             const query = 'SELECT * FROM users WHERE email = ?';
//             db.query(query, [email], (err, results) => {
//                 if (err) reject(err);
//                 else resolve(results[0]);
//             });
//         });
//     }

//     static async create(userData) {
//         const hashedPassword = await bcrypt.hash(userData.password, 10);
//         return new Promise((resolve, reject) => {
//             const query = 'INSERT INTO users (email, password_hash, full_name, role) VALUES (?, ?, ?, ?)';
//             db.query(query, [userData.email, hashedPassword, userData.full_name, userData.role], (err, result) => {
//                 if (err) reject(err);
//                 else resolve({ id: result.insertId, ...userData });
//             });
//         });
//     }

//     static async verifyPassword(plainPassword, hashedPassword) {
//         return await bcrypt.compare(plainPassword, hashedPassword);
//     }

//     static async getById(userId) {
//         return new Promise((resolve, reject) => {
//             const query = 'SELECT id, email, full_name, role, status, created_at FROM users WHERE id = ?';
//             db.query(query, [userId], (err, results) => {
//                 if (err) reject(err);
//                 else resolve(results[0]);
//             });
//         });
//     }
// }

// module.exports = User;


// models/User.js - Simple version for testing
const db = require('../config/database');

class User {
    static async findByEmail(email) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM users WHERE email = ?';
            db.query(query, [email], (err, results) => {
                if (err) {
                    console.error('Database error:', err);
                    reject(err);
                } else {
                    console.log('User query results:', results);
                    resolve(results[0]);
                }
            });
        });
    }

    // For now, skip bcrypt - we'll use plain passwords for testing
    static async verifyPassword(plainPassword, hashedPassword) {
        // TEMPORARY: Return true if passwords match
        return plainPassword === hashedPassword;
    }

    static async getById(userId) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT id, email, full_name, role, status, created_at FROM users WHERE id = ?';
            db.query(query, [userId], (err, results) => {
                if (err) reject(err);
                else resolve(results[0]);
            });
        });
    }
}

module.exports = User;