const db = require('../config/database');

const idCardController = {
  // Get ID card statistics
  getStats: (req, res) => {
    const sql = `
      -- Total issued (issued + pending + delivered)
      SELECT 
        (SELECT COUNT(*) FROM id_cards WHERE status IN ('issued', 'pending', 'delivered')) as totalIssued,
        
        -- This month (issued this month)
        (SELECT COUNT(*) FROM id_cards 
         WHERE MONTH(issue_date) = MONTH(CURRENT_DATE()) 
         AND YEAR(issue_date) = YEAR(CURRENT_DATE())
         AND status IN ('issued', 'pending', 'delivered')) as thisMonth,
        
        -- Pending (printed but not delivered)
        (SELECT COUNT(*) FROM id_cards WHERE status = 'pending') as pending,
        
        -- Coverage percentage
        ROUND(
          (SELECT COUNT(DISTINCT individual_id) FROM id_cards WHERE status IN ('issued', 'pending', 'delivered')) 
          / 
          (SELECT COUNT(*) FROM individuals WHERE is_active = 1 AND deleted_at IS NULL) 
          * 100, 
        0) as coverage
    `;

    db.query(sql, (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({
          success: false,
          message: 'Error fetching ID card statistics'
        });
      }

      const stats = results[0] || {};
      
      res.json({
        success: true,
        data: {
          totalIssued: stats.totalIssued || 0,
          thisMonth: stats.thisMonth || 0,
          pending: stats.pending || 0,
          coverage: stats.coverage || 0
        }
      });
    });
  },

  // Create new ID card
  createIdCard: (req, res) => {
    const {
      individual_id,
      issue_date,
      expiry_date,
      blood_type,
      emergency_contact,
      region,
      zone,
      woreda,
      kebele,
      house_number,
      status = 'issued'
    } = req.body;

    // Generate Ethiopian ID number: ET-YYYY-XXXXXX
    const year = new Date().getFullYear();
    const prefix = `ET-${year}`;
    
    // Get next sequence number
    const sequenceSql = `
      SELECT COUNT(*) as count FROM id_cards 
      WHERE card_number LIKE '${prefix}-%'
    `;

    db.query(sequenceSql, (seqErr, seqResults) => {
      if (seqErr) {
        return res.status(500).json({
          success: false,
          message: 'Error generating card number'
        });
      }

      const count = (seqResults[0]?.count || 0) + 1;
      const card_number = `${prefix}-${String(count).padStart(6, '0')}`;

      const insertSql = `
        INSERT INTO id_cards 
        (card_number, individual_id, issue_date, expiry_date, status, 
         blood_type, emergency_contact, region, zone, woreda, kebele, house_number, issued_by)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const values = [
        card_number,
        individual_id,
        issue_date,
        expiry_date,
        status,
        blood_type,
        emergency_contact,
        region,
        zone,
        woreda,
        kebele,
        house_number,
        req.user?.id || 1 // Assuming you have user authentication
      ];

      db.query(insertSql, values, (insertErr, result) => {
        if (insertErr) {
          console.error('Insert error:', insertErr);
          return res.status(500).json({
            success: false,
            message: 'Error creating ID card'
          });
        }

        res.status(201).json({
          success: true,
          message: 'ID Card issued successfully',
          data: {
            id: result.insertId,
            card_number,
            individual_id,
            issue_date,
            expiry_date,
            status
          }
        });
      });
    });
  },

  // Get individual by search (for form)
  searchIndividual: (req, res) => {
    const { query } = req.query;
    
    const sql = `
      SELECT id, first_name, last_name, phone, dob, gender, 
             family_number, house_number, photo_url
      FROM individuals 
      WHERE (first_name LIKE ? OR last_name LIKE ? OR phone LIKE ? 
             OR family_number LIKE ? OR house_number LIKE ?)
        AND is_active = 1 
        AND deleted_at IS NULL
      LIMIT 10
    `;

    const searchTerm = `%${query}%`;
    
    db.query(sql, [searchTerm, searchTerm, searchTerm, searchTerm, searchTerm], (err, results) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Error searching individuals'
        });
      }

      res.json({
        success: true,
        data: results
      });
    });
  }
};

module.exports = idCardController;