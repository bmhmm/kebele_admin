const express = require('express');
const router = express.Router();
const db = require('../config/database');

// GET /api/houses/stats - House statistics
// router.get('/stats', async (req, res) => {
//   try {
//     const query = `
//       SELECT 
//         COUNT(*) as totalHouses,
//         SUM(CASE WHEN status = 'occupied' THEN 1 ELSE 0 END) as occupied,
//         SUM(CASE WHEN status = 'vacant' THEN 1 ELSE 0 END) as vacant,
//         SUM(CASE WHEN 
//           MONTH(created_at) = MONTH(CURRENT_DATE()) 
//           AND YEAR(created_at) = YEAR(CURRENT_DATE())
//           THEN 1 ELSE 0 END) as thisMonth
//       FROM houses
//     `;
    
//     db.query(query, (err, results) => {
//       if (err) {
//         console.error('Database error:', err);
//         return res.status(500).json({
//           success: false,
//           message: 'Database error fetching house statistics'
//         });
//       }
      
//       const stats = results[0];
//       res.json({
//         success: true,
//         data: {
//           totalHouses: stats.totalHouses || 0,
//           occupied: stats.occupied || 0,
//           vacant: stats.vacant || 0,
//           thisMonth: stats.thisMonth || 0
//         }
//       });
//     });
    
//   } catch (error) {
//     console.error('Error fetching house stats:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Server error'
//     });
//   }
// });


// In your backend houses stats route
router.get('/stats', async (req, res) => {
  try {
    console.log('=== FETCHING HOUSE STATS ===');
    
    const query = `
      SELECT 
        COUNT(*) as totalHouses,
        SUM(CASE WHEN status = 'occupied' THEN 1 ELSE 0 END) as occupied,
        SUM(CASE WHEN status = 'vacant' THEN 1 ELSE 0 END) as vacant,
        SUM(CASE WHEN 
          MONTH(created_at) = MONTH(CURRENT_DATE()) 
          AND YEAR(created_at) = YEAR(CURRENT_DATE())
          THEN 1 ELSE 0 END) as thisMonth
      FROM houses
    `;
    
    console.log('Executing query:', query);
    
    db.query(query, (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({
          success: false,
          message: 'Database error fetching house statistics'
        });
      }
      
      console.log('Database results:', results);
      
      const stats = results[0];
      res.json({
        success: true,
        data: {
          totalHouses: stats.totalHouses || 0,
          occupied: stats.occupied || 0,
          vacant: stats.vacant || 0,
          thisMonth: stats.thisMonth || 0
        }
      });
    });
    
  } catch (error) {
    console.error('Error fetching house stats:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// GET /api/houses - Get all houses
router.get('/', async (req, res) => {
  try {
    const query = `
      SELECT * FROM houses 
      ORDER BY created_at DESC
    `;
    
    db.query(query, (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({
          success: false,
          message: 'Database error fetching houses'
        });
      }
      
      res.json({
        success: true,
        data: results,
        count: results.length
      });
    });
    
  } catch (error) {
    console.error('Error fetching houses:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// POST /api/houses - Create new house
router.post('/', async (req, res) => {
  try {
    const {
      houseNumber,
      zone,
      kebele,
      city,
      region,
      address,
      ownerName,
      ownerPhone,
      ownerIdNumber,
      propertyType,
      status,
      rooms,
      areaSqm,
      constructionYear,
      hasElectricity,
      hasWater,
      latitude,
      longitude,
      notes
    } = req.body;
    
    // Validate required fields
    if (!houseNumber || !zone || !kebele || !city || !region) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: houseNumber, zone, kebele, city, and region are required'
      });
    }
    
    // Check if house number already exists
    const checkQuery = 'SELECT id FROM houses WHERE house_number = ?';
    db.query(checkQuery, [houseNumber], (checkErr, checkResults) => {
      if (checkErr) {
        console.error('Database error:', checkErr);
        return res.status(500).json({
          success: false,
          message: 'Database error checking house number'
        });
      }
      
      if (checkResults.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'House number already exists'
        });
      }
      
      // Insert new house
      const insertQuery = `
        INSERT INTO houses (
          house_number, zone, kebele, city, region, address, 
          owner_name, owner_phone, owner_id_number, property_type, 
          status, rooms, area_sqm, construction_year, has_electricity, 
          has_water, latitude, longitude, notes
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      
      const values = [
        houseNumber, zone, kebele, city, region, address || null,
        ownerName || null, ownerPhone || null, ownerIdNumber || null,
        propertyType || 'residential', status || 'vacant', rooms || 1,
        areaSqm || null, constructionYear || null, hasElectricity !== false,
        hasWater !== false, latitude || null, longitude || null, notes || null
      ];
      
      db.query(insertQuery, values, (insertErr, insertResults) => {
        if (insertErr) {
          console.error('Database error:', insertErr);
          return res.status(500).json({
            success: false,
            message: 'Database error creating house'
          });
        }
        
        res.json({
          success: true,
          message: 'House registered successfully',
          data: {
            id: insertResults.insertId,
            houseNumber
          }
        });
      });
    });
    
  } catch (error) {
    console.error('Error creating house:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating house'
    });
  }
});

// GET /api/houses/search - Search houses
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || q.trim() === '') {
      return res.json({
        success: true,
        data: [],
        count: 0
      });
    }
    
    const searchTerm = `%${q.trim()}%`;
    const query = `
      SELECT * FROM houses 
      WHERE house_number LIKE ? 
        OR owner_name LIKE ? 
        OR address LIKE ?
      ORDER BY house_number
      LIMIT 20
    `;
    
    db.query(query, [searchTerm, searchTerm, searchTerm], (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({
          success: false,
          message: 'Database error searching houses'
        });
      }
      
      res.json({
        success: true,
        data: results,
        count: results.length
      });
    });
    
  } catch (error) {
    console.error('Error searching houses:', error);
    res.status(500).json({
      success: false,
      message: 'Server error searching houses'
    });
  }
});

// GET /api/houses/:id - Get house by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const query = 'SELECT * FROM houses WHERE id = ?';
    
    db.query(query, [id], (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({
          success: false,
          message: 'Database error fetching house'
        });
      }
      
      if (results.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'House not found'
        });
      }
      
      res.json({
        success: true,
        data: results[0]
      });
    });
    
  } catch (error) {
    console.error('Error fetching house:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// PUT /api/houses/:id - Update house
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // Build update query dynamically
    const fields = [];
    const values = [];
    
    Object.keys(updateData).forEach(key => {
      fields.push(`${key} = ?`);
      values.push(updateData[key]);
    });
    
    values.push(id);
    
    const query = `UPDATE houses SET ${fields.join(', ')} WHERE id = ?`;
    
    db.query(query, values, (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({
          success: false,
          message: 'Database error updating house'
        });
      }
      
      res.json({
        success: true,
        message: 'House updated successfully',
        data: { id }
      });
    });
    
  } catch (error) {
    console.error('Error updating house:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating house'
    });
  }
});

module.exports = router;