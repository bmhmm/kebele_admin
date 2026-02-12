const db = require('../config/database');

const Family = {
  // Generate unique family number
  generateFamilyNumber: (callback) => {
    const query = `
      SELECT MAX(CAST(SUBSTRING(family_number, 5) AS UNSIGNED)) as last_number 
      FROM families 
      WHERE family_number LIKE 'FAM-%'
    `;
    db.query(query, (err, result) => {
      if (err) return callback(err);
      const nextNumber = (result[0]?.last_number || 0) + 1;
      const familyNumber = `FAM-${String(nextNumber).padStart(3, '0')}`;
      callback(null, familyNumber);
    });
  },

  // Create new family
  create: (familyData, callback) => {
    const query = `
      INSERT INTO families 
      (family_number, house_number, zone, address, head_id) 
      VALUES (?, ?, ?, ?, ?)
    `;
    const values = [
      familyData.familyNumber,
      familyData.houseNumber,
      familyData.zone,
      familyData.address,
      familyData.head_id
    ];

    db.query(query, values, callback);
  },

  //Get all active families
  getAll: (callback) => {
    const query = `
      SELECT f.*, 
        CONCAT(i.first_name, ' ', i.last_name) as head_name,
        i.phone as head_phone,
        (
          SELECT COUNT(*) 
          FROM individuals im 
          WHERE im.family_id = f.id AND im.is_active = TRUE
        ) as member_count
      FROM families f
      LEFT JOIN individuals i ON f.head_id = i.id
      WHERE f.is_active = TRUE 
      ORDER BY f.created_at DESC
    `;
    db.query(query, callback);
  },

  

  // Get family by ID with members
  getById: (id, callback) => {
    const query = `
      SELECT f.*, 
        JSON_OBJECT(
          'id', i.id,
          'firstName', i.first_name,
          'lastName', i.last_name,
          'phone', i.phone,
          'age', i.age,
          'gender', i.gender,
          'photoUrl', i.photo_url
        ) as head,
        (
          SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
              'id', im.id,
              'firstName', im.first_name,
              'lastName', im.last_name,
              'relationship', im.relationship,
              'age', im.age,
              'gender', im.gender,
              'phone', im.phone,
              'photoUrl', im.photo_url
            )
          )
          FROM individuals im 
          WHERE im.family_id = f.id AND im.is_active = TRUE
        ) as members
      FROM families f
      LEFT JOIN individuals i ON f.head_id = i.id
      WHERE f.id = ? AND f.is_active = TRUE
    `;
    db.query(query, [id], callback);
  },

  // Update family
  update: (id, familyData, callback) => {
    const query = `
      UPDATE families 
      SET house_number = ?, zone = ?, address = ?, head_id = ?, 
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ? AND is_active = TRUE
    `;
    
    const values = [
      familyData.houseNumber,
      familyData.zone,
      familyData.address,
      familyData.head_id,
      id
    ];

    db.query(query, values, callback);
  },

  // Soft delete family
  softDelete: (id, callback) => {
    const query = `
      UPDATE families 
      SET is_active = FALSE, updated_at = CURRENT_TIMESTAMP 
      WHERE id = ?
    `;
    db.query(query, [id], callback);
  },

  // Check if house number exists
  checkHouseNumber: (houseNumber, excludeId = null, callback) => {
    let query = 'SELECT id, family_number FROM families WHERE house_number = ? AND is_active = TRUE';
    let params = [houseNumber];
    
    if (excludeId) {
      query += ' AND id != ?';
      params.push(excludeId);
    }
    
    db.query(query, params, callback);
  },

  // Check if family number exists
  checkFamilyNumber: (familyNumber, excludeId = null, callback) => {
    let query = 'SELECT id, house_number FROM families WHERE family_number = ? AND is_active = TRUE';
    let params = [familyNumber];
    
    if (excludeId) {
      query += ' AND id != ?';
      params.push(excludeId);
    }
    
    db.query(query, params, callback);
  },

  // Add member to family
  addMember: (familyId, individualId, callback) => {
    const query = 'UPDATE individuals SET family_id = ? WHERE id = ?';
    db.query(query, [familyId, individualId], callback);
  },

  // Remove member from family
  removeMember: (individualId, callback) => {
    const query = 'UPDATE individuals SET family_id = NULL WHERE id = ?';
    db.query(query, [individualId], callback);
  },

  // Get family members
  getMembers: (familyId, callback) => {
    const query = `
      SELECT id, first_name, last_name, relationship, age, gender, phone, photo_url
      FROM individuals 
      WHERE family_id = ? AND is_active = TRUE
      ORDER BY 
        CASE relationship
          WHEN 'head' THEN 1
          WHEN 'spouse' THEN 2
          WHEN 'child' THEN 3
          WHEN 'parent' THEN 4
          WHEN 'sibling' THEN 5
          ELSE 6
        END
    `;
    db.query(query, [familyId], callback);
  },

  // Search families
  search: (searchTerm, callback) => {
    const query = `
      SELECT f.*, 
        CONCAT(i.first_name, ' ', i.last_name) as head_name,
        i.phone as head_phone
      FROM families f
      LEFT JOIN individuals i ON f.head_id = i.id
      WHERE f.is_active = TRUE 
        AND (f.family_number LIKE ? OR f.house_number LIKE ? OR 
             i.first_name LIKE ? OR i.last_name LIKE ?)
      ORDER BY f.family_number
    `;
    const searchPattern = `%${searchTerm}%`;
    db.query(query, [searchPattern, searchPattern, searchPattern, searchPattern], callback);
  },

  // Get family statistics
  getStats: (callback) => {
    const queries = {
      total: 'SELECT COUNT(*) as count FROM families WHERE is_active = TRUE',
      thisMonth: `
        SELECT COUNT(*) as count FROM families 
        WHERE is_active = TRUE 
        AND MONTH(created_at) = MONTH(CURRENT_DATE()) 
        AND YEAR(created_at) = YEAR(CURRENT_DATE())
      `,
      thisWeek: `
        SELECT COUNT(*) as count FROM families 
        WHERE is_active = TRUE 
        AND YEARWEEK(created_at) = YEARWEEK(CURRENT_DATE())
      `,
      today: `
        SELECT COUNT(*) as count FROM families 
        WHERE is_active = TRUE 
        AND DATE(created_at) = CURRENT_DATE()
      `,
      avgMembers: `
        SELECT IFNULL(ROUND(AVG(member_count), 1), 0) as avg_members 
        FROM (
          SELECT COUNT(*) as member_count 
          FROM individuals 
          WHERE family_id IS NOT NULL AND is_active = TRUE 
          GROUP BY family_id
        ) as family_counts
      `,
      byZone: `
        SELECT zone, COUNT(*) as count 
        FROM families 
        WHERE is_active = TRUE 
        GROUP BY zone 
        ORDER BY count DESC
      `
    };

    const results = {
      total: 0,
      thisMonth: 0,
      thisWeek: 0,
      today: 0,
      avgMembers: 0,
      zones: []
    };

    let completed = 0;
    const totalQueries = Object.keys(queries).length;

    Object.keys(queries).forEach(key => {
      db.query(queries[key], (err, result) => {
        if (err) {
          console.error(`Error in ${key} query:`, err);
        } else {
          if (key === 'total') results.total = result[0].count;
          if (key === 'thisMonth') results.thisMonth = result[0].count;
          if (key === 'thisWeek') results.thisWeek = result[0].count;
          if (key === 'today') results.today = result[0].count;
          if (key === 'avgMembers') results.avgMembers = result[0].avg_members;
          if (key === 'byZone') results.zones = result;
        }
        
        completed++;
        
        if (completed === totalQueries) {
          callback(null, results);
        }
      });
    });
  }
};

module.exports = Family;