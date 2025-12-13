const Individual = require('../models/inidividualModel');
const { deleteFile, getFilenameFromUrl } = require('../middleware/uploadMiddleware');

const individualController = {
  // Create new individual with enhanced duplicate checking (REMOVED family number uniqueness)
  createIndividual: (req, res) => {
    try {
      const {
        firstName,
        lastName,
        dob,
        age,
        gender,
        religion,
        nationality,
        occupation,
        education,
        familyNumber,
        houseNumber,
        relationship,
        phone,
        email
      } = req.body;

      // Validate required fields
      const requiredFields = {
        firstName, lastName, dob, age, gender, religion,
        occupation, education, familyNumber, houseNumber,
        relationship, phone
      };

      const missingFields = Object.keys(requiredFields).filter(field => !requiredFields[field]);
      
      if (missingFields.length > 0) {
        if (req.file) deleteFile(req.file.filename);
        return res.status(400).json({
          success: false,
          message: `Missing required fields: ${missingFields.join(', ')}`
        });
      }

      // Validate phone format (Ethiopian)
      const phoneRegex = /^(\+251|0)(9|7)[0-9]{8}$/;
      const cleanedPhone = phone.replace(/\s+/g, '');
      if (!phoneRegex.test(cleanedPhone)) {
        if (req.file) deleteFile(req.file.filename);
        return res.status(400).json({
          success: false,
          message: 'Please provide a valid Ethiopian phone number'
        });
      }

      // Validate email if provided
      if (email && email.trim() !== '') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          if (req.file) deleteFile(req.file.filename);
          return res.status(400).json({
            success: false,
            message: 'Please provide a valid email address'
          });
        }
      }

      const individualData = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        dob,
        age: parseInt(age),
        gender,
        religion,
        nationality: nationality || 'ethiopian',
        occupation: occupation.trim(),
        education,
        familyNumber: familyNumber.trim(),
        houseNumber: houseNumber.trim(),
        relationship,
        phone: cleanedPhone,
        email: email ? email.trim() : null,
        photoUrl: req.file ? `/uploads/${req.file.filename}` : null
      };

      // Check for duplicates (phone, email, house number) - NO family number check
      Individual.checkDuplicates(individualData, (dupErr, duplicates) => {
        if (dupErr) {
          if (req.file) deleteFile(req.file.filename);
          return res.status(500).json({
            success: false,
            message: 'Error checking for duplicate records'
          });
        }

        // Check if any duplicates exist
        const duplicateFields = Object.keys(duplicates).filter(field => duplicates[field].exists);
        
        if (duplicateFields.length > 0) {
          if (req.file) deleteFile(req.file.filename);
          
          const duplicateMessages = duplicateFields.map(field => {
            const record = duplicates[field].existingRecord;
            switch (field) {
              case 'phone':
                return `Phone number already registered by ${record.first_name} ${record.last_name}`;
              case 'houseNumber':
                return `House number already assigned to ${record.first_name} ${record.last_name}`;
              case 'email':
                return `Email already registered by ${record.first_name} ${record.last_name}`;
              default:
                return `${field} already exists`;
            }
          });

          return res.status(400).json({
            success: false,
            message: 'Duplicate records found',
            duplicates: duplicateMessages,
            duplicateFields: duplicateFields
          });
        }

        // Create individual if no duplicates found
        Individual.create(individualData, (err, result) => {
          if (err) {
            console.error('Database error:', err);
            if (req.file) deleteFile(req.file.filename);
            return res.status(500).json({
              success: false,
              message: 'Error creating individual record'
            });
          }

          res.status(201).json({
            success: true,
            message: 'Individual registered successfully',
            data: {
              id: result.insertId,
              ...individualData
            }
          });
        });
      });

    } catch (error) {
      console.error('Controller error:', error);
      if (req.file) deleteFile(req.file.filename);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  },

  // Get all active individuals
  getAllIndividuals: (req, res) => {
    Individual.getAll((err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({
          success: false,
          message: 'Error fetching individuals'
        });
      }

      // Convert database field names to camelCase for frontend
      const formattedResults = results.map(individual => ({
        id: individual.id,
        firstName: individual.first_name,
        lastName: individual.last_name,
        dob: individual.dob,
        age: individual.age,
        gender: individual.gender,
        religion: individual.religion,
        nationality: individual.nationality,
        occupation: individual.occupation,
        education: individual.education,
        familyNumber: individual.family_number,
        houseNumber: individual.house_number,
        relationship: individual.relationship,
        phone: individual.phone,
        email: individual.email,
        photoUrl: individual.photo_url,
        createdAt: individual.created_at,
        updatedAt: individual.updated_at
      }));

      res.json({
        success: true,
        data: formattedResults,
        count: formattedResults.length
      });
    });
  },

  // Get individual by ID
  getIndividualById: (req, res) => {
    const { id } = req.params;

    Individual.getById(id, (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({
          success: false,
          message: 'Error fetching individual'
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Individual not found'
        });
      }

      const individual = results[0];
      const formattedIndividual = {
        id: individual.id,
        firstName: individual.first_name,
        lastName: individual.last_name,
        dob: individual.dob,
        age: individual.age,
        gender: individual.gender,
        religion: individual.religion,
        nationality: individual.nationality,
        occupation: individual.occupation,
        education: individual.education,
        familyNumber: individual.family_number,
        houseNumber: individual.house_number,
        relationship: individual.relationship,
        phone: individual.phone,
        email: individual.email,
        photoUrl: individual.photo_url,
        createdAt: individual.created_at,
        updatedAt: individual.updated_at
      };

      res.json({
        success: true,
        data: formattedIndividual
      });
    });
  },

  // Update individual
  updateIndividual: (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      Individual.getById(id, (err, results) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: 'Error finding individual'
          });
        }

        if (results.length === 0) {
          if (req.file) deleteFile(req.file.filename);
          return res.status(404).json({
            success: false,
            message: 'Individual not found'
          });
        }

        const currentData = results[0];
        
        // Handle photo update
        let photoUrl = currentData.photo_url;
        if (req.file) {
          // Delete old photo if exists
          if (currentData.photo_url) {
            const oldFilename = getFilenameFromUrl(currentData.photo_url);
            deleteFile(oldFilename);
          }
          photoUrl = `/uploads/${req.file.filename}`;
        }

        const updatedData = {
          firstName: updateData.firstName || currentData.first_name,
          lastName: updateData.lastName || currentData.last_name,
          dob: updateData.dob || currentData.dob,
          age: parseInt(updateData.age) || currentData.age,
          gender: updateData.gender || currentData.gender,
          religion: updateData.religion || currentData.religion,
          nationality: updateData.nationality || currentData.nationality,
          occupation: updateData.occupation || currentData.occupation,
          education: updateData.education || currentData.education,
          familyNumber: updateData.familyNumber || currentData.family_number,
          houseNumber: updateData.houseNumber || currentData.house_number,
          relationship: updateData.relationship || currentData.relationship,
          phone: updateData.phone || currentData.phone,
          email: updateData.email || currentData.email,
          photoUrl: photoUrl
        };

        // Validate phone if provided
        if (updateData.phone) {
          const phoneRegex = /^(\+251|0)(9|7)[0-9]{8}$/;
          const cleanedPhone = updateData.phone.replace(/\s+/g, '');
          if (!phoneRegex.test(cleanedPhone)) {
            if (req.file) deleteFile(req.file.filename);
            return res.status(400).json({
              success: false,
              message: 'Please provide a valid Ethiopian phone number'
            });
          }
          updatedData.phone = cleanedPhone;
        }

        Individual.update(id, updatedData, (updateErr) => {
          if (updateErr) {
            console.error('Update error:', updateErr);
            if (req.file) deleteFile(req.file.filename);
            return res.status(500).json({
              success: false,
              message: 'Error updating individual'
            });
          }

          res.json({
            success: true,
            message: 'Individual updated successfully',
            data: { id: parseInt(id), ...updatedData }
          });
        });
      });

    } catch (error) {
      console.error('Controller error:', error);
      if (req.file) deleteFile(req.file.filename);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  },

  // Soft delete individual
  deleteIndividual: (req, res) => {
    const { id } = req.params;

    Individual.getById(id, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Error finding individual'
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Individual not found'
        });
      }

      const individual = results[0];

      Individual.softDelete(id, (deleteErr) => {
        if (deleteErr) {
          console.error('Database error:', deleteErr);
          return res.status(500).json({
            success: false,
            message: 'Error deleting individual'
          });
        }

        res.json({
          success: true,
          message: 'Individual deleted successfully'
        });
      });
    });
  },

  // Restore soft deleted individual
  restoreIndividual: (req, res) => {
    const { id } = req.params;

    Individual.restore(id, (err) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({
          success: false,
          message: 'Error restoring individual'
        });
      }

      res.json({
        success: true,
        message: 'Individual restored successfully'
      });
    });
  },

  // Get deleted individuals (admin only)
  getDeletedIndividuals: (req, res) => {
    Individual.getDeleted((err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({
          success: false,
          message: 'Error fetching deleted individuals'
        });
      }

      const formattedResults = results.map(individual => ({
        id: individual.id,
        firstName: individual.first_name,
        lastName: individual.last_name,
        dob: individual.dob,
        age: individual.age,
        gender: individual.gender,
        religion: individual.religion,
        nationality: individual.nationality,
        occupation: individual.occupation,
        education: individual.education,
        familyNumber: individual.family_number,
        houseNumber: individual.house_number,
        relationship: individual.relationship,
        phone: individual.phone,
        email: individual.email,
        photoUrl: individual.photo_url,
        createdAt: individual.created_at,
        updatedAt: individual.updated_at,
        deletedAt: individual.deleted_at
      }));

      res.json({
        success: true,
        data: formattedResults,
        count: formattedResults.length
      });
    });
  },

  // Get statistics
  getStatistics: (req, res) => {
    Individual.getStats((err, stats) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({
          success: false,
          message: 'Error fetching statistics'
        });
      }

      res.json({
        success: true,
        data: stats
      });
    });
  },

  // Get individuals by family number
  getByFamilyNumber: (req, res) => {
    const { familyNumber } = req.params;

    Individual.getByFamilyNumber(familyNumber, (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({
          success: false,
          message: 'Error fetching family members'
        });
      }

      const formattedResults = results.map(individual => ({
        id: individual.id,
        firstName: individual.first_name,
        lastName: individual.last_name,
        dob: individual.dob,
        age: individual.age,
        gender: individual.gender,
        relationship: individual.relationship,
        phone: individual.phone,
        photoUrl: individual.photo_url
      }));

      res.json({
        success: true,
        data: formattedResults,
        count: formattedResults.length
      });
    });
  },

  // Clean up orphaned files (admin utility endpoint)
  cleanupOrphanedFiles: (req, res) => {
    res.json({
      success: true,
      message: 'Cleanup functionality would be implemented here'
    });
  }
};

module.exports = individualController;


