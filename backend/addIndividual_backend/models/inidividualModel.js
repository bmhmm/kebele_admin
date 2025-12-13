const db = require('../config/database');

const Individual = {
  // Create new individual
  create: (individualData, callback) => {
    const query = `
      INSERT INTO individuals 
      (first_name, last_name, dob, age, gender, religion, nationality, 
       occupation, education, family_number, house_number, relationship, 
       phone, email, photo_url) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const values = [
      individualData.firstName,
      individualData.lastName,
      individualData.dob,
      individualData.age,
      individualData.gender,
      individualData.religion,
      individualData.nationality,
      individualData.occupation,
      individualData.education,
      individualData.familyNumber,
      individualData.houseNumber,
      individualData.relationship,
      individualData.phone,
      individualData.email,
      individualData.photoUrl
    ];

    db.query(query, values, callback);
  },

  // Get all active individuals
  getAll: (callback) => {
    const query = `
      SELECT * FROM individuals 
      WHERE is_active = TRUE 
      ORDER BY created_at DESC
    `;
    db.query(query, callback);
  },

  // Get individual by ID
  getById: (id, callback) => {
    const query = 'SELECT * FROM individuals WHERE id = ? AND is_active = TRUE';
    db.query(query, [id], callback);
  },

  // Update individual
  update: (id, individualData, callback) => {
    const query = `
      UPDATE individuals 
      SET first_name = ?, last_name = ?, dob = ?, age = ?, gender = ?, 
          religion = ?, nationality = ?, occupation = ?, education = ?,
          family_number = ?, house_number = ?, relationship = ?, 
          phone = ?, email = ?, photo_url = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ? AND is_active = TRUE
    `;
    
    const values = [
      individualData.firstName,
      individualData.lastName,
      individualData.dob,
      individualData.age,
      individualData.gender,
      individualData.religion,
      individualData.nationality,
      individualData.occupation,
      individualData.education,
      individualData.familyNumber,
      individualData.houseNumber,
      individualData.relationship,
      individualData.phone,
      individualData.email,
      individualData.photoUrl,
      id
    ];

    db.query(query, values, callback);
  },

  // Soft delete individual
  softDelete: (id, callback) => {
    const query = `
      UPDATE individuals 
      SET is_active = FALSE, deleted_at = CURRENT_TIMESTAMP 
      WHERE id = ?
    `;
    db.query(query, [id], callback);
  },

  // Restore soft deleted individual
  restore: (id, callback) => {
    const query = `
      UPDATE individuals 
      SET is_active = TRUE, deleted_at = NULL 
      WHERE id = ?
    `;
    db.query(query, [id], callback);
  },

  // Get deleted individuals (for admin/recovery)
  getDeleted: (callback) => {
    const query = 'SELECT * FROM individuals WHERE is_active = FALSE ORDER BY deleted_at DESC';
    db.query(query, callback);
  },

  // Hard delete individual (permanent removal)
  hardDelete: (id, callback) => {
    const query = 'DELETE FROM individuals WHERE id = ?';
    db.query(query, [id], callback);
  },

  // Check if house number exists
  checkHouseNumber: (houseNumber, callback) => {
    const query = 'SELECT COUNT(*) as count FROM individuals WHERE house_number = ? AND is_active = TRUE';
    db.query(query, [houseNumber], callback);
  },

  // Enhanced duplicate checking methods (REMOVED family number check)
  checkDuplicates: (individualData, callback) => {
    const queries = [
      { 
        query: 'SELECT id, first_name, last_name FROM individuals WHERE phone = ? AND is_active = TRUE', 
        params: [individualData.phone],
        field: 'phone'
      },
      { 
        query: 'SELECT id, first_name, last_name FROM individuals WHERE house_number = ? AND is_active = TRUE', 
        params: [individualData.houseNumber],
        field: 'houseNumber'
      }
    ];

    // Only check email if provided
    if (individualData.email && individualData.email.trim() !== '') {
      queries.push({
        query: 'SELECT id, first_name, last_name FROM individuals WHERE email = ? AND is_active = TRUE',
        params: [individualData.email],
        field: 'email'
      });
    }

    const duplicates = {};
    let completed = 0;

    queries.forEach(({ query, params, field }) => {
      db.query(query, params, (err, results) => {
        if (err) {
          console.error(`Error checking ${field}:`, err);
        } else if (results.length > 0) {
          duplicates[field] = {
            exists: true,
            existingRecord: results[0]
          };
        } else {
          duplicates[field] = { exists: false };
        }

        completed++;
        if (completed === queries.length) {
          callback(null, duplicates);
        }
      });
    });
  },

  // Check if phone number already exists (for update operations)
  checkPhoneExists: (phone, excludeId = null, callback) => {
    let query = 'SELECT id, first_name, last_name FROM individuals WHERE phone = ? AND is_active = TRUE';
    let params = [phone];
    
    if (excludeId) {
      query += ' AND id != ?';
      params.push(excludeId);
    }
    
    db.query(query, params, callback);
  },

  // Check if email already exists (for update operations)
  checkEmailExists: (email, excludeId = null, callback) => {
    let query = 'SELECT id, first_name, last_name FROM individuals WHERE email = ? AND is_active = TRUE';
    let params = [email];
    
    if (excludeId) {
      query += ' AND id != ?';
      params.push(excludeId);
    }
    
    db.query(query, params, callback);
  },

  // Check if house number already exists (for update operations)
  checkHouseNumberExists: (houseNumber, excludeId = null, callback) => {
    let query = 'SELECT id, first_name, last_name FROM individuals WHERE house_number = ? AND is_active = TRUE';
    let params = [houseNumber];
    
    if (excludeId) {
      query += ' AND id != ?';
      params.push(excludeId);
    }
    
    db.query(query, params, callback);
  },

  // Check for existing photo by filename (basic duplicate file check)
  checkPhotoExists: (filename, callback) => {
    const query = 'SELECT id, first_name, last_name FROM individuals WHERE photo_url LIKE ? AND is_active = TRUE';
    db.query(query, [`%${filename}%`], callback);
  },

  // Get individuals by family number
  getByFamilyNumber: (familyNumber, callback) => {
    const query = 'SELECT * FROM individuals WHERE family_number = ? AND is_active = TRUE ORDER BY relationship';
    db.query(query, [familyNumber], callback);
  },

  // Get individuals by house number
  getByHouseNumber: (houseNumber, callback) => {
    const query = 'SELECT * FROM individuals WHERE house_number = ? AND is_active = TRUE';
    db.query(query, [houseNumber], callback);
  },

  // Search individuals by name, phone, or family number
  search: (searchTerm, callback) => {
    const query = `
      SELECT * FROM individuals 
      WHERE is_active = TRUE 
        AND (first_name LIKE ? OR last_name LIKE ? OR phone LIKE ? OR family_number LIKE ?)
      ORDER BY first_name, last_name
    `;
    const searchPattern = `%${searchTerm}%`;
    db.query(query, [searchPattern, searchPattern, searchPattern, searchPattern], callback);
  },

  // Get statistics - UPDATED FOR PROPER FORMAT
  getStats: (callback) => {
    const queries = {
      total: 'SELECT COUNT(*) as count FROM individuals WHERE is_active = TRUE',
      thisMonth: `
        SELECT COUNT(*) as count FROM individuals 
        WHERE is_active = TRUE 
        AND MONTH(created_at) = MONTH(CURRENT_DATE()) 
        AND YEAR(created_at) = YEAR(CURRENT_DATE())
      `,
      thisWeek: `
        SELECT COUNT(*) as count FROM individuals 
        WHERE is_active = TRUE 
        AND YEARWEEK(created_at) = YEARWEEK(CURRENT_DATE())
      `,
      today: `
        SELECT COUNT(*) as count FROM individuals 
        WHERE is_active = TRUE 
        AND DATE(created_at) = CURRENT_DATE()
      `
    };

    const results = {
      total: 0,
      thisMonth: 0,
      thisWeek: 0,
      today: 0
    };

    let completed = 0;
    const totalQueries = Object.keys(queries).length;

    Object.keys(queries).forEach(key => {
      db.query(queries[key], (err, result) => {
        if (err) {
          console.error(`Error in ${key} query:`, err);
          // Keep default value of 0 if query fails
        } else {
          // Map to the exact field names frontend expects
          if (key === 'total') results.total = result[0].count;
          if (key === 'thisMonth') results.thisMonth = result[0].count;
          if (key === 'thisWeek') results.thisWeek = result[0].count;
          if (key === 'today') results.today = result[0].count;
        }
        
        completed++;
        
        if (completed === totalQueries) {
          callback(null, results);
        }
      });
    });
  },
  updateFamily: (individualId, familyId, callback) => {
    const query = 'UPDATE individuals SET family_id = ? WHERE id = ?';
    db.query(query, [familyId, individualId], callback);
  }
};

module.exports = Individual;























