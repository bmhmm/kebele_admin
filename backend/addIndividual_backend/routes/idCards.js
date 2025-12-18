const express = require('express');
const router = express.Router();
const idCardController = require('../controllers/idController');
const db = require('../config/database');

// ID Card routes
router.get('/stats', idCardController.getStats);
router.post('/', idCardController.createIdCard);
router.get('/search-individuals', idCardController.searchIndividual);
// Get all ID cards
// router.get('/', async (req, res) => {
//   const sql = `
//     SELECT 
//       ic.*,
//       i.first_name,
//       i.last_name,
//       i.gender,
//       i.dob,
//       i.photo_url
//     FROM id_cards ic
//     JOIN individuals i ON ic.individual_id = i.id
//     ORDER BY ic.created_at DESC
//   `;

//   db.query(sql, (err, results) => {
//     if (err) {
//       console.error('Database error:', err);
//       return res.status(500).json({
//         success: false,
//         message: 'Error fetching ID cards'
//       });
//     }

//     res.json({
//       success: true,
//       data: results
//     });
//   });
// });

// Get all ID cards - UPDATED VERSION
router.get('/', async (req, res) => {
  console.log('📡 GET /api/id-cards - Fetching all ID cards');
  
  const sql = `
    SELECT 
      ic.id,
      ic.card_number,
      ic.individual_id,
      ic.issue_date,
      ic.expiry_date,
      ic.status,
      ic.blood_type,
      ic.place_of_birth,
      ic.residence_address,
      ic.created_at,
      ic.updated_at,
      -- Individual details
      i.first_name,
      i.last_name,
      i.gender,
      i.dob,
      i.photo_url,
      i.phone,
      i.family_number,
      i.house_number
    FROM id_cards ic
    JOIN individuals i ON ic.individual_id = i.id
    WHERE i.is_active = 1 
      AND i.deleted_at IS NULL
    ORDER BY ic.created_at DESC
  `;

  console.log('🔍 SQL Query:', sql);

  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ Database error:', err);
      return res.status(500).json({
        success: false,
        message: 'Error fetching ID cards'
      });
    }

    console.log(`✅ Found ${results.length} ID cards`);
    
    // Format the data for frontend
    const formattedResults = results.map(card => ({
      id: card.id,
      card_number: card.card_number,
      individual_id: card.individual_id,
      issue_date: card.issue_date,
      expiry_date: card.expiry_date,
      status: card.status,
      blood_type: card.blood_type,
      place_of_birth: card.place_of_birth,
      residence_address: card.residence_address,
      created_at: card.created_at,
      // Individual details
      first_name: card.first_name,
      last_name: card.last_name,
      full_name: `${card.first_name} ${card.last_name}`, // Add full name
      gender: card.gender,
      dob: card.dob,
      photo_url: card.photo_url,
      phone: card.phone,
      family_number: card.family_number,
      house_number: card.house_number
    }));
    
    res.json({
      success: true,
      data: formattedResults,
      count: results.length
    });
  });
});


// Get single ID card by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  
  const sql = `
    SELECT 
      ic.*,
      i.first_name,
      i.last_name,
      i.gender,
      i.dob,
      i.photo_url,
      i.phone
    FROM id_cards ic
    JOIN individuals i ON ic.individual_id = i.id
    WHERE ic.id = ?
  `;

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({
        success: false,
        message: 'Error fetching ID card'
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'ID card not found'
      });
    }

    res.json({
      success: true,
      data: results[0]
    });
  });
});

// Test route
router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'ID Cards API is working'
  });
});

module.exports = router;