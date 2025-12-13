const Family = require('../models/family');
const Individual = require('../models/inidividualModel');

const familyController = {
  // Create new family
  createFamily: async (req, res) => {
    try {
      const { houseNumber, zone, address, headId } = req.body;

      // Validate required fields
      if (!houseNumber || !zone || !headId) {
        return res.status(400).json({
          success: false,
          message: 'House number, zone, and head ID are required'
        });
      }

      // Check if house number already exists
      Family.checkHouseNumber(houseNumber, null, (houseErr, houseResults) => {
        if (houseErr) {
          console.error('House check error:', houseErr);
          return res.status(500).json({
            success: false,
            message: 'Error checking house number'
          });
        }

        if (houseResults.length > 0) {
          return res.status(400).json({
            success: false,
            message: `House number ${houseNumber} is already registered to family ${houseResults[0].family_number}`
          });
        }

        // Check if head individual exists and is not in another family
        Individual.getById(headId, (headErr, headResults) => {
          if (headErr) {
            console.error('Head check error:', headErr);
            return res.status(500).json({
              success: false,
              message: 'Error checking head individual'
            });
          }

          if (headResults.length === 0) {
            return res.status(404).json({
              success: false,
              message: 'Head individual not found'
            });
          }

          const headIndividual = headResults[0];
          
          // Check if head is already in a family
          if (headIndividual.family_id) {
            return res.status(400).json({
              success: false,
              message: `Head individual is already in family ${headIndividual.family_id}`
            });
          }

          // Generate family number
          Family.generateFamilyNumber((genErr, familyNumber) => {
            if (genErr) {
              console.error('Family number generation error:', genErr);
              return res.status(500).json({
                success: false,
                message: 'Error generating family number'
              });
            }

            const familyData = {
              familyNumber,
              houseNumber: houseNumber.trim(),
              zone: zone.trim(),
              address: address ? address.trim() : null,
              headId: parseInt(headId)
            };

            // Create family
            Family.create(familyData, (createErr, result) => {
              if (createErr) {
                console.error('Family creation error:', createErr);
                return res.status(500).json({
                  success: false,
                  message: 'Error creating family record'
                });
              }

              const familyId = result.insertId;

              // Update head's family_id
              Individual.updateFamily(headId, familyId, (updateErr) => {
                if (updateErr) {
                  console.error('Update head error:', updateErr);
                  // Rollback family creation
                  Family.softDelete(familyId, () => {});
                  return res.status(500).json({
                    success: false,
                    message: 'Error updating head individual'
                  });
                }

                res.status(201).json({
                  success: true,
                  message: 'Family registered successfully',
                  data: {
                    id: familyId,
                    ...familyData
                  }
                });
              });
            });
          });
        });
      });

    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  },

  // Get all families
  getAllFamilies: (req, res) => {
    Family.getAll((err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({
          success: false,
          message: 'Error fetching families'
        });
      }

      res.json({
        success: true,
        data: results,
        count: results.length
      });
    });
  },

  // Get family by ID
  getFamilyById: (req, res) => {
    const { id } = req.params;

    Family.getById(id, (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({
          success: false,
          message: 'Error fetching family'
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Family not found'
        });
      }

      const family = results[0];
      
      // Parse JSON fields
      if (family.head) {
        try {
          family.head = JSON.parse(family.head);
        } catch (e) {
          family.head = null;
        }
      }

      if (family.members) {
        try {
          family.members = JSON.parse(family.members);
        } catch (e) {
          family.members = [];
        }
      } else {
        family.members = [];
      }

      res.json({
        success: true,
        data: family
      });
    });
  },

  // Update family
  updateFamily: (req, res) => {
    try {
      const { id } = req.params;
      const { houseNumber, zone, address, headId } = req.body;

      // Validate required fields
      if (!houseNumber || !zone || !headId) {
        return res.status(400).json({
          success: false,
          message: 'House number, zone, and head ID are required'
        });
      }

      // Check if family exists
      Family.getById(id, (err, results) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: 'Error finding family'
          });
        }

        if (results.length === 0) {
          return res.status(404).json({
            success: false,
            message: 'Family not found'
          });
        }

        const currentFamily = results[0];

        // Check if new house number already exists (excluding current family)
        Family.checkHouseNumber(houseNumber, id, (houseErr, houseResults) => {
          if (houseErr) {
            return res.status(500).json({
              success: false,
              message: 'Error checking house number'
            });
          }

          if (houseResults.length > 0) {
            return res.status(400).json({
              success: false,
              message: `House number ${houseNumber} is already registered to another family`
            });
          }

          // Check if new head exists
          Individual.getById(headId, (headErr, headResults) => {
            if (headErr) {
              return res.status(500).json({
                success: false,
                message: 'Error checking head individual'
              });
            }

            if (headResults.length === 0) {
              return res.status(404).json({
                success: false,
                message: 'Head individual not found'
              });
            }

            const newHead = headResults[0];

            // If changing head, update old head's family_id to null
            if (parseInt(headId) !== currentFamily.head_id) {
              // Remove old head from family
              Individual.updateFamily(currentFamily.head_id, null, (oldHeadErr) => {
                if (oldHeadErr) {
                  console.error('Error removing old head:', oldHeadErr);
                }
              });
            }

            // Update new head's family_id
            Individual.updateFamily(headId, id, (updateHeadErr) => {
              if (updateHeadErr) {
                return res.status(500).json({
                  success: false,
                  message: 'Error updating head individual'
                });
              }

              const familyData = {
                houseNumber: houseNumber.trim(),
                zone: zone.trim(),
                address: address ? address.trim() : null,
                headId: parseInt(headId)
              };

              // Update family
              Family.update(id, familyData, (updateErr) => {
                if (updateErr) {
                  console.error('Update error:', updateErr);
                  return res.status(500).json({
                    success: false,
                    message: 'Error updating family'
                  });
                }

                res.json({
                  success: true,
                  message: 'Family updated successfully',
                  data: { id: parseInt(id), ...familyData }
                });
              });
            });
          });
        });
      });

    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  },

  // Delete family (soft delete)
  deleteFamily: (req, res) => {
    const { id } = req.params;

    // Check if family exists
    Family.getById(id, (err, results) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: 'Error finding family'
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Family not found'
        });
      }

      // Remove all members from family
      Family.getMembers(id, (membersErr, members) => {
        if (membersErr) {
          console.error('Error getting members:', membersErr);
        } else {
          // Update each member's family_id to null
          members.forEach(member => {
            Individual.updateFamily(member.id, null, () => {});
          });
        }

        // Soft delete family
        Family.softDelete(id, (deleteErr) => {
          if (deleteErr) {
            console.error('Database error:', deleteErr);
            return res.status(500).json({
              success: false,
              message: 'Error deleting family'
            });
          }

          res.json({
            success: true,
            message: 'Family deleted successfully'
          });
        });
      });
    });
  },

  // Get family members
  getFamilyMembers: (req, res) => {
    const { id } = req.params;

    Family.getMembers(id, (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({
          success: false,
          message: 'Error fetching family members'
        });
      }

      res.json({
        success: true,
        data: results,
        count: results.length
      });
    });
  },

  // Add member to family
  addMemberToFamily: (req, res) => {
    const { id } = req.params;
    const { individualId } = req.body;

    if (!individualId) {
      return res.status(400).json({
        success: false,
        message: 'Individual ID is required'
      });
    }

    // Check if family exists
    Family.getById(id, (familyErr, familyResults) => {
      if (familyErr) {
        return res.status(500).json({
          success: false,
          message: 'Error finding family'
        });
      }

      if (familyResults.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Family not found'
        });
      }

      // Check if individual exists
      Individual.getById(individualId, (indErr, indResults) => {
        if (indErr) {
          return res.status(500).json({
            success: false,
            message: 'Error finding individual'
          });
        }

        if (indResults.length === 0) {
          return res.status(404).json({
            success: false,
            message: 'Individual not found'
          });
        }

        const individual = indResults[0];

        // Check if individual is already in a family
        if (individual.family_id) {
          return res.status(400).json({
            success: false,
            message: `Individual is already in family ${individual.family_id}`
          });
        }

        // Add member to family
        Family.addMember(id, individualId, (addErr) => {
          if (addErr) {
            console.error('Add member error:', addErr);
            return res.status(500).json({
              success: false,
              message: 'Error adding member to family'
            });
          }

          res.json({
            success: true,
            message: 'Member added to family successfully'
          });
        });
      });
    });
  },

  // Remove member from family
  removeMemberFromFamily: (req, res) => {
    const { id, memberId } = req.params;

    // Check if individual is actually in this family
    Individual.getById(memberId, (err, results) => {
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

      if (individual.family_id !== parseInt(id)) {
        return res.status(400).json({
          success: false,
          message: 'Individual is not a member of this family'
        });
      }

      // Check if trying to remove the head
      Family.getById(id, (familyErr, familyResults) => {
        if (familyErr) {
          return res.status(500).json({
            success: false,
            message: 'Error finding family'
          });
        }

        if (familyResults.length > 0 && familyResults[0].head_id === parseInt(memberId)) {
          return res.status(400).json({
            success: false,
            message: 'Cannot remove head of family. Change head first.'
          });
        }

        // Remove member from family
        Family.removeMember(memberId, (removeErr) => {
          if (removeErr) {
            console.error('Remove member error:', removeErr);
            return res.status(500).json({
              success: false,
              message: 'Error removing member from family'
            });
          }

          res.json({
            success: true,
            message: 'Member removed from family successfully'
          });
        });
      });
    });
  },

  // Search families
  searchFamilies: (req, res) => {
    const { q } = req.query;

    if (!q || q.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    Family.search(q.trim(), (err, results) => {
      if (err) {
        console.error('Search error:', err);
        return res.status(500).json({
          success: false,
          message: 'Error searching families'
        });
      }

      res.json({
        success: true,
        data: results,
        count: results.length
      });
    });
  },

  // Get family statistics
  getFamilyStats: (req, res) => {
    Family.getStats((err, stats) => {
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

  // Search individuals not in any family (for adding as head/member)
  searchAvailableIndividuals: (req, res) => {
    const { q } = req.query;

    if (!q || q.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    const query = `
      SELECT id, first_name, last_name, phone, age, gender, photo_url
      FROM individuals 
      WHERE is_active = TRUE 
        AND family_id IS NULL
        AND (first_name LIKE ? OR last_name LIKE ? OR phone LIKE ?)
      ORDER BY first_name, last_name
      LIMIT 20
    `;
    
    const searchPattern = `%${q.trim()}%`;
    
    db.query(query, [searchPattern, searchPattern, searchPattern], (err, results) => {
      if (err) {
        console.error('Search error:', err);
        return res.status(500).json({
          success: false,
          message: 'Error searching individuals'
        });
      }

      res.json({
        success: true,
        data: results,
        count: results.length
      });
    });
  }
};

module.exports = familyController;