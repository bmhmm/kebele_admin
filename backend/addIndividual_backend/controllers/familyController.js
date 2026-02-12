// const Family = require('../models/family');
// const Individual = require('../models/inidividualModel');

// const familyController = {
//   // Create new family
//   createFamily: async (req, res) => {
//     try {
//       const { houseNumber, zone, address, head_id } = req.body;
//       console.log('=== CREATE FAMILY CALLED ===');
//     console.log('Request body:', req.body);
//     console.log('Headers content-type:', req.headers['content-type']);


    
//     // ADD THIS:
//     console.log('Parsed data:', { houseNumber, zone, address, head_id });

//       // Validate required fields
//       if (!houseNumber || !zone || !head_id) {
//         return res.status(400).json({
//           success: false,
//           message: 'House number, zone, and head ID are required'
//         });
//       }

//       // Check if house number already exists
//       Family.checkHouseNumber(houseNumber, null, (houseErr, houseResults) => {
//         if (houseErr) {
//           console.error('House check error:', houseErr);
//           return res.status(500).json({
//             success: false,
//             message: 'Error checking house number'
//           });
//         }

//         if (houseResults.length > 0) {
//           return res.status(400).json({
//             success: false,
//             message: `House number ${houseNumber} is already registered to family ${houseResults[0].family_number}`
//           });
//         }

//         // Check if head individual exists and is not in another family
//         Individual.getById(head_id, (headErr, headResults) => {
//           if (headErr) {
//             console.error('Head check error:', headErr);
//             return res.status(500).json({
//               success: false,
//               message: 'Error checking head individual'
//             });
//           }

//           if (headResults.length === 0) {
//             return res.status(404).json({
//               success: false,
//               message: 'Head individual not found'
//             });
//           }

//           const headIndividual = headResults[0];
          
//           // Check if head is already in a family
//           if (headIndividual.family_id) {
//             return res.status(400).json({
//               success: false,
//               message: `Head individual is already in family ${headIndividual.family_id}`
//             });
//           }

//           // Generate family number
//           Family.generateFamilyNumber((genErr, familyNumber) => {
//             if (genErr) {
//               console.error('Family number generation error:', genErr);
//               return res.status(500).json({
//                 success: false,
//                 message: 'Error generating family number'
//               });
//             }

//             const familyData = {
//               familyNumber,
//               houseNumber: houseNumber.trim(),
//               zone: zone.trim(),
//               address: address ? address.trim() : null,
//               head_id: parseInt(head_id)
//             };

//             // Create family
//             Family.create(familyData, (createErr, result) => {
//               if (createErr) {
//                 console.error('Family creation error:', createErr);
//                 return res.status(500).json({
//                   success: false,
//                   message: 'Error creating family record'
//                 });
//               }

//               const familyId = result.insertId;

//               // Update head's family_id
//               Individual.updateFamily(head_id, familyId, (updateErr) => {
//                 if (updateErr) {
//                   console.error('Update head error:', updateErr);
//                   // Rollback family creation
//                   Family.softDelete(familyId, () => {});
//                   return res.status(500).json({
//                     success: false,
//                     message: 'Error updating head individual'
//                   });
//                 }

//                 res.status(201).json({
//                   success: true,
//                   message: 'Family registered successfully',
//                   data: {
//                     id: familyId,
//                     ...familyData
//                   }
//                 });
//               });
//             });
//           });
//         });
//       });

//     } catch (error) {
//       console.error('Controller error:', error);
//       res.status(500).json({
//         success: false,
//         message: 'Internal server error'
//       });
//     }
//   },

//   // Get all families
//   getAllFamilies: (req, res) => {
//     Family.getAll((err, results) => {
//       if (err) {
//         console.error('Database error:', err);
//         return res.status(500).json({
//           success: false,
//           message: 'Error fetching families'
//         });
//       }

//       res.json({
//         success: true,
//         data: results,
//         count: results.length
//       });
//     });
//   },

//   // Get family by ID
//   getFamilyById: (req, res) => {
//     const { id } = req.params;

//     Family.getById(id, (err, results) => {
//       if (err) {
//         console.error('Database error:', err);
//         return res.status(500).json({
//           success: false,
//           message: 'Error fetching family'
//         });
//       }

//       if (results.length === 0) {
//         return res.status(404).json({
//           success: false,
//           message: 'Family not found'
//         });
//       }

//       const family = results[0];
      
//       // Parse JSON fields
//       if (family.head) {
//         try {
//           family.head = JSON.parse(family.head);
//         } catch (e) {
//           family.head = null;
//         }
//       }

//       if (family.members) {
//         try {
//           family.members = JSON.parse(family.members);
//         } catch (e) {
//           family.members = [];
//         }
//       } else {
//         family.members = [];
//       }

//       res.json({
//         success: true,
//         data: family
//       });
//     });
//   },

//   // Update family
//   updateFamily: (req, res) => {
//     try {
//       const { id } = req.params;
//       const { houseNumber, zone, address, head_id } = req.body;

//       // Validate required fields
//       if (!houseNumber || !zone || !head_id) {
//         return res.status(400).json({
//           success: false,
//           message: 'House number, zone, and head ID are required'
//         });
//       }

//       // Check if family exists
//       Family.getById(id, (err, results) => {
//         if (err) {
//           return res.status(500).json({
//             success: false,
//             message: 'Error finding family'
//           });
//         }

//         if (results.length === 0) {
//           return res.status(404).json({
//             success: false,
//             message: 'Family not found'
//           });
//         }

//         const currentFamily = results[0];

//         // Check if new house number already exists (excluding current family)
//         Family.checkHouseNumber(houseNumber, id, (houseErr, houseResults) => {
//           if (houseErr) {
//             return res.status(500).json({
//               success: false,
//               message: 'Error checking house number'
//             });
//           }

//           if (houseResults.length > 0) {
//             return res.status(400).json({
//               success: false,
//               message: `House number ${houseNumber} is already registered to another family`
//             });
//           }

//           // Check if new head exists
//           Individual.getById(head_id, (headErr, headResults) => {
//             if (headErr) {
//               return res.status(500).json({
//                 success: false,
//                 message: 'Error checking head individual'
//               });
//             }

//             if (headResults.length === 0) {
//               return res.status(404).json({
//                 success: false,
//                 message: 'Head individual not found'
//               });
//             }

//             const newHead = headResults[0];

//             // If changing head, update old head's family_id to null
//             if (parseInt(head_id) !== currentFamily.head_id) {
//               // Remove old head from family
//               Individual.updateFamily(currentFamily.head_id, null, (oldHeadErr) => {
//                 if (oldHeadErr) {
//                   console.error('Error removing old head:', oldHeadErr);
//                 }
//               });
//             }

//             // Update new head's family_id
//             Individual.updateFamily(head_id, id, (updateHeadErr) => {
//               if (updateHeadErr) {
//                 return res.status(500).json({
//                   success: false,
//                   message: 'Error updating head individual'
//                 });
//               }

//               const familyData = {
//                 houseNumber: houseNumber.trim(),
//                 zone: zone.trim(),
//                 address: address ? address.trim() : null,
//                 head_id: parseInt(head_id)
//               };

//               // Update family
//               Family.update(id, familyData, (updateErr) => {
//                 if (updateErr) {
//                   console.error('Update error:', updateErr);
//                   return res.status(500).json({
//                     success: false,
//                     message: 'Error updating family'
//                   });
//                 }

//                 res.json({
//                   success: true,
//                   message: 'Family updated successfully',
//                   data: { id: parseInt(id), ...familyData }
//                 });
//               });
//             });
//           });
//         });
//       });

//     } catch (error) {
//       console.error('Controller error:', error);
//       res.status(500).json({
//         success: false,
//         message: 'Internal server error'
//       });
//     }
//   },

//   // Delete family (soft delete)
//   deleteFamily: (req, res) => {
//     const { id } = req.params;

//     // Check if family exists
//     Family.getById(id, (err, results) => {
//       if (err) {
//         return res.status(500).json({
//           success: false,
//           message: 'Error finding family'
//         });
//       }

//       if (results.length === 0) {
//         return res.status(404).json({
//           success: false,
//           message: 'Family not found'
//         });
//       }

//       // Remove all members from family
//       Family.getMembers(id, (membersErr, members) => {
//         if (membersErr) {
//           console.error('Error getting members:', membersErr);
//         } else {
//           // Update each member's family_id to null
//           members.forEach(member => {
//             Individual.updateFamily(member.id, null, () => {});
//           });
//         }

//         // Soft delete family
//         Family.softDelete(id, (deleteErr) => {
//           if (deleteErr) {
//             console.error('Database error:', deleteErr);
//             return res.status(500).json({
//               success: false,
//               message: 'Error deleting family'
//             });
//           }

//           res.json({
//             success: true,
//             message: 'Family deleted successfully'
//           });
//         });
//       });
//     });
//   },

//   // Get family members
//   getFamilyMembers: (req, res) => {
//     const { id } = req.params;

//     Family.getMembers(id, (err, results) => {
//       if (err) {
//         console.error('Database error:', err);
//         return res.status(500).json({
//           success: false,
//           message: 'Error fetching family members'
//         });
//       }

//       res.json({
//         success: true,
//         data: results,
//         count: results.length
//       });
//     });
//   },

//   // Add member to family
//   addMemberToFamily: (req, res) => {
//     const { id } = req.params;
//     const { individualId } = req.body;

//     if (!individualId) {
//       return res.status(400).json({
//         success: false,
//         message: 'Individual ID is required'
//       });
//     }

//     // Check if family exists
//     Family.getById(id, (familyErr, familyResults) => {
//       if (familyErr) {
//         return res.status(500).json({
//           success: false,
//           message: 'Error finding family'
//         });
//       }

//       if (familyResults.length === 0) {
//         return res.status(404).json({
//           success: false,
//           message: 'Family not found'
//         });
//       }

//       // Check if individual exists
//       Individual.getById(individualId, (indErr, indResults) => {
//         if (indErr) {
//           return res.status(500).json({
//             success: false,
//             message: 'Error finding individual'
//           });
//         }

//         if (indResults.length === 0) {
//           return res.status(404).json({
//             success: false,
//             message: 'Individual not found'
//           });
//         }

//         const individual = indResults[0];

//         // Check if individual is already in a family
//         if (individual.family_id) {
//           return res.status(400).json({
//             success: false,
//             message: `Individual is already in family ${individual.family_id}`
//           });
//         }

//         // Add member to family
//         Family.addMember(id, individualId, (addErr) => {
//           if (addErr) {
//             console.error('Add member error:', addErr);
//             return res.status(500).json({
//               success: false,
//               message: 'Error adding member to family'
//             });
//           }

//           res.json({
//             success: true,
//             message: 'Member added to family successfully'
//           });
//         });
//       });
//     });
//   },

//   // Remove member from family
//   removeMemberFromFamily: (req, res) => {
//     const { id, memberId } = req.params;

//     // Check if individual is actually in this family
//     Individual.getById(memberId, (err, results) => {
//       if (err) {
//         return res.status(500).json({
//           success: false,
//           message: 'Error finding individual'
//         });
//       }

//       if (results.length === 0) {
//         return res.status(404).json({
//           success: false,
//           message: 'Individual not found'
//         });
//       }

//       const individual = results[0];

//       if (individual.family_id !== parseInt(id)) {
//         return res.status(400).json({
//           success: false,
//           message: 'Individual is not a member of this family'
//         });
//       }

//       // Check if trying to remove the head
//       Family.getById(id, (familyErr, familyResults) => {
//         if (familyErr) {
//           return res.status(500).json({
//             success: false,
//             message: 'Error finding family'
//           });
//         }

//         if (familyResults.length > 0 && familyResults[0].head_id === parseInt(memberId)) {
//           return res.status(400).json({
//             success: false,
//             message: 'Cannot remove head of family. Change head first.'
//           });
//         }

//         // Remove member from family
//         Family.removeMember(memberId, (removeErr) => {
//           if (removeErr) {
//             console.error('Remove member error:', removeErr);
//             return res.status(500).json({
//               success: false,
//               message: 'Error removing member from family'
//             });
//           }

//           res.json({
//             success: true,
//             message: 'Member removed from family successfully'
//           });
//         });
//       });
//     });
//   },

//   // Search families
//   searchFamilies: (req, res) => {
//     const { q } = req.query;

//     if (!q || q.trim() === '') {
//       return res.status(400).json({
//         success: false,
//         message: 'Search query is required'
//       });
//     }

//     Family.search(q.trim(), (err, results) => {
//       if (err) {
//         console.error('Search error:', err);
//         return res.status(500).json({
//           success: false,
//           message: 'Error searching families'
//         });
//       }

//       res.json({
//         success: true,
//         data: results,
//         count: results.length
//       });
//     });
//   },

//   // Get family statistics
//   getFamilyStats: (req, res) => {
//     Family.getStats((err, stats) => {
//       if (err) {
//         console.error('Database error:', err);
//         return res.status(500).json({
//           success: false,
//           message: 'Error fetching statistics'
//         });
//       }

//       res.json({
//         success: true,
//         data: stats
//       });
//     });
//   },

//   // Search individuals not in any family (for adding as head/member)
//   // searchAvailableIndividuals: (req, res) => {
//   //   const { q } = req.query;

//   //   if (!q || q.trim() === '') {
//   //     return res.status(400).json({
//   //       success: false,
//   //       message: 'Search query is required'
//   //     });
//   //   }

//   //   const query = `
//   //     SELECT id, first_name, last_name, phone, age, gender, photo_url
//   //     FROM individuals 
//   //     WHERE is_active = TRUE 
//   //       AND family_id IS NULL
//   //       AND (first_name LIKE ? OR last_name LIKE ? OR phone LIKE ?)
//   //     ORDER BY first_name, last_name
//   //     LIMIT 20
//   //   `;
    
//   //   const searchPattern = `%${q.trim()}%`;
    
//   //   db.query(query, [searchPattern, searchPattern, searchPattern], (err, results) => {
//   //     if (err) {
//   //       console.error('Search error:', err);
//   //       return res.status(500).json({
//   //         success: false,
//   //         message: 'Error searching individuals'
//   //       });
//   //     }

//   //     res.json({
//   //       success: true,
//   //       data: results,
//   //       count: results.length
//   //     });
//   //   });
//   // }

//   searchAvailableIndividuals: (req, res) => {
//   const { q } = req.query;

//   console.log('=== SEARCH CALLED ===');
//   console.log('Search query:', q);

//   if (!q || q.trim() === '') {
//     return res.json({
//       success: true,
//       data: [],
//       count: 0
//     });
//   }

//   // UPDATED QUERY - removed is_active
//   // const query = `
//   //   SELECT id, first_name, last_name, phone, age, gender, photo_url
//   //   FROM individuals 
//   //   WHERE (family_id IS NULL OR family_id = '')
//   //     AND (first_name LIKE ? OR last_name LIKE ? OR phone LIKE ?)
//   //   ORDER BY first_name, last_name
//   //   LIMIT 20
//   // `;
  
// const query = `
//   SELECT id, first_name, last_name, phone, age, gender, photo_url
//   FROM individuals 
//   WHERE (family_id IS NULL OR family_id = '')
//     AND (first_name LIKE ? OR last_name LIKE ? OR phone LIKE ?)
//   ORDER BY first_name, last_name
//   LIMIT 20
// `;


//   const searchPattern = `%${q.trim()}%`;
//   console.log('Search pattern:', searchPattern);
  
//   db.query(query, [searchPattern, searchPattern, searchPattern], (err, results) => {
//     if (err) {
//       console.error('Database error:', err);
//       // Return empty results instead of error
//       return res.json({
//         success: true,
//         data: [],
//         count: 0
//       });
//     }

//     console.log('Found individuals:', results);

//     res.json({
//       success: true,
//       data: results,
//       count: results.length
//     });
//   });
// }
// };

// module.exports = familyController;


const Family = require('../models/family');
const Individual = require('../models/inidividualModel');
const db = require('../config/database');

const familyController = {
  // Create new family with head creation
  createFamily: async (req, res) => {
    try {
      const { houseNumber, zone, address, headFirstName, headLastName, headGender, headPhone } = req.body;
      
      console.log('=== CREATE FAMILY CALLED ===');
      console.log('Request body:', req.body);
      console.log('Headers content-type:', req.headers['content-type']);
      console.log('Parsed data:', { houseNumber, zone, address, headFirstName, headLastName, headGender, headPhone });

      // Validate required fields
      if (!houseNumber || !zone || !headPhone) {
        return res.status(400).json({
          success: false,
          message: 'House number, zone, and head phone are required'
        });
      }

      if (!headFirstName || !headLastName) {
        return res.status(400).json({
          success: false,
          message: 'Head first name and last name are required'
        });
      }

      // Clean phone number (remove spaces and ensure +251 format)
      const cleanPhone = headPhone.replace(/\s/g, '');
      let formattedPhone = cleanPhone;
      
      if (cleanPhone.startsWith('0')) {
        formattedPhone = '+251' + cleanPhone.substring(1);
      } else if (!cleanPhone.startsWith('+251') && cleanPhone.length === 9) {
        formattedPhone = '+251' + cleanPhone;
      }

      console.log('Formatted phone:', formattedPhone);

      // Step 1: Check if house number already exists
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

        // Step 2: Check if head individual exists by phone
        const checkHeadQuery = 'SELECT id, family_id FROM individuals WHERE phone = ? AND is_active = TRUE LIMIT 1';
        
        db.query(checkHeadQuery, [formattedPhone], (headErr, headResults) => {
          if (headErr) {
            console.error('Head check error:', headErr);
            return res.status(500).json({
              success: false,
              message: 'Error checking head individual'
            });
          }

          let headId;

          if (headResults.length > 0) {
            // Head exists
            const existingHead = headResults[0];
            
            // Check if head is already in a family
            if (existingHead.family_id) {
              return res.status(400).json({
                success: false,
                message: `This individual is already in family ${existingHead.family_id}`
              });
            }
            
            headId = existingHead.id;
            console.log('Using existing head ID:', headId);
            continueWithFamilyCreation(headId);
          } else {
            // Step 3: Create new head individual
            const createHeadQuery = `
              INSERT INTO individuals 
              (first_name, last_name, gender, phone, house_number, relationship) 
              VALUES (?, ?, ?, ?, ?, 'head')
            `;
            
            const headValues = [
              headFirstName.trim(),
              headLastName.trim(),
              headGender || 'male',
              formattedPhone,
              houseNumber.trim()
            ];
            
            console.log('Creating new head with values:', headValues);
            
            db.query(createHeadQuery, headValues, (createErr, createResult) => {
              if (createErr) {
                console.error('Create head error:', createErr);
                
                // Handle duplicate phone error
                if (createErr.code === 'ER_DUP_ENTRY' || createErr.errno === 1062) {
                  return res.status(400).json({
                    success: false,
                    message: 'Phone number already exists in the system'
                  });
                }
                
                return res.status(500).json({
                  success: false,
                  message: 'Error creating head individual'
                });
              }
              
              headId = createResult.insertId;
              console.log('Created new head ID:', headId);
              continueWithFamilyCreation(headId);
            });
          }

          function continueWithFamilyCreation(headId) {
            // Step 4: Generate family number
            Family.generateFamilyNumber((genErr, familyNumber) => {
              if (genErr) {
                console.error('Family number generation error:', genErr);
                
                // If we created a head, we should delete it on error
                if (headId && !headResults || headResults.length === 0) {
                  const deleteQuery = 'DELETE FROM individuals WHERE id = ?';
                  db.query(deleteQuery, [headId], () => {});
                }
                
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
                head_id: headId
              };

              console.log('Creating family with data:', familyData);

              // Step 5: Create family
              Family.create(familyData, (createFamilyErr, result) => {
                if (createFamilyErr) {
                  console.error('Family creation error:', createFamilyErr);
                  
                  // If we created a head, delete it on error
                  if (headId && (!headResults || headResults.length === 0)) {
                    const deleteQuery = 'DELETE FROM individuals WHERE id = ?';
                    db.query(deleteQuery, [headId], () => {});
                  }
                  
                  return res.status(500).json({
                    success: false,
                    message: 'Error creating family record'
                  });
                }

                const familyId = result.insertId;

                // Step 6: Update head's family_id
                Individual.updateFamily(headId, familyId, (updateErr) => {
                  if (updateErr) {
                    console.error('Update head error:', updateErr);
                    
                    // Rollback family creation
                    Family.softDelete(familyId, () => {});
                    
                    // If we created a head, delete it
                    if (headId && (!headResults || headResults.length === 0)) {
                      const deleteQuery = 'DELETE FROM individuals WHERE id = ?';
                      db.query(deleteQuery, [headId], () => {});
                    }
                    
                    return res.status(500).json({
                      success: false,
                      message: 'Error updating head individual'
                    });
                  }

                  console.log('Family created successfully. Family ID:', familyId, 'Head ID:', headId);

                  // Get the created family with details
                  Family.getById(familyId, (fetchErr, familyResults) => {
                    if (fetchErr) {
                      console.error('Error fetching created family:', fetchErr);
                      // Still return success, but with basic data
                      return res.status(201).json({
                        success: true,
                        message: 'Family registered successfully',
                        data: {
                          id: familyId,
                          ...familyData
                        }
                      });
                    }

                    const family = familyResults[0];
                    
                    // Parse JSON fields
                    if (family.head) {
                      try {
                        family.head = JSON.parse(family.head);
                      } catch (e) {
                        family.head = null;
                      }
                    }

                    res.status(201).json({
                      success: true,
                      message: 'Family registered successfully',
                      data: family
                    });
                  });
                });
              });
            });
          }
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

  // Get all families (keep existing code)
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

  // Get family by ID (keep existing code)
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

  // Update family (keep existing code)
  updateFamily: (req, res) => {
    try {
      const { id } = req.params;
      const { houseNumber, zone, address, head_id } = req.body;

      // Validate required fields
      if (!houseNumber || !zone || !head_id) {
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
          Individual.getById(head_id, (headErr, headResults) => {
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
            if (parseInt(head_id) !== currentFamily.head_id) {
              // Remove old head from family
              Individual.updateFamily(currentFamily.head_id, null, (oldHeadErr) => {
                if (oldHeadErr) {
                  console.error('Error removing old head:', oldHeadErr);
                }
              });
            }

            // Update new head's family_id
            Individual.updateFamily(head_id, id, (updateHeadErr) => {
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
                head_id: parseInt(head_id)
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

  // Delete family (soft delete) - keep existing code
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

  // Get family members - keep existing code
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

  // Add member to family - keep existing code
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

  // Remove member from family - keep existing code
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

  // Search families - keep existing code
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

  // Get family statistics - keep existing code
  // getFamilyStats: (req, res) => {
  //   Family.getStats((err, stats) => {
  //     if (err) {
  //       console.error('Database error:', err);
  //       return res.status(500).json({
  //         success: false,
  //         message: 'Error fetching statistics'
  //       });
  //     }

  //     res.json({
  //       success: true,
  //       data: stats
  //     });
  //   });
  // }
  
  
  getFamilyStatistics: (req, res) => {
  console.log('📊 Fetching family statistics...');
  
  // Use family_number (varchar) for family grouping
  // Filter by is_active = 1 AND deleted_at IS NULL
  const sql = `
    SELECT 
      -- Count distinct family numbers
      COUNT(DISTINCT family_number) as totalFamilies,
      
      -- Count all active individuals
      COUNT(*) as totalMembers,
      
      -- Calculate average members per family (handle division by zero)
      CASE 
        WHEN COUNT(DISTINCT family_number) > 0 
        THEN ROUND(
          COUNT(*) / COUNT(DISTINCT family_number), 
          1
        )
        ELSE 0 
      END as avgPerFamily,
      
      -- Count distinct families created this month
      COUNT(DISTINCT 
        CASE 
          WHEN MONTH(created_at) = MONTH(CURRENT_DATE()) 
          AND YEAR(created_at) = YEAR(CURRENT_DATE()) 
          THEN family_number
        END
      ) as thisMonth
      
    FROM individuals 
    WHERE is_active = 1 
      AND deleted_at IS NULL
      AND family_number IS NOT NULL
      AND family_number != ''
  `;

  console.log('🔍 Executing SQL:', sql);

  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ Database error:', err);
      console.error('SQL error details:', err.sqlMessage);
      
      return res.status(500).json({
        success: false,
        message: 'Error fetching family statistics',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
      });
    }

    console.log('✅ SQL results:', results);
    
    const stats = results[0] || {};
    console.log('📊 Calculated stats:', {
      totalFamilies: stats.totalFamilies,
      totalMembers: stats.totalMembers,
      avgPerFamily: stats.avgPerFamily,
      thisMonth: stats.thisMonth
    });
    
    res.json({
      success: true,
      data: {
        totalFamilies: stats.totalFamilies || 0,
        totalMembers: stats.totalMembers || 0,
        avgPerFamily: stats.avgPerFamily || 0,
        thisMonth: stats.thisMonth || 0
      }
    });
  });
},

  // Search individuals not in any family - keep existing code
  // searchAvailableIndividuals: (req, res) => {
  //   const { q } = req.query;

  //   console.log('=== SEARCH CALLED ===');
  //   console.log('Search query:', q);

  //   if (!q || q.trim() === '') {
  //     return res.json({
  //       success: true,
  //       data: [],
  //       count: 0
  //     });
  //   }

  //   const query = `
  //     SELECT id, first_name, last_name, phone, age, gender, photo_url
  //     FROM individuals 
  //     WHERE (family_id IS NULL OR family_id = '')
  //       AND (first_name LIKE ? OR last_name LIKE ? OR phone LIKE ?)
  //     ORDER BY first_name, last_name
  //     LIMIT 20
  //   `;

  //   const searchPattern = `%${q.trim()}%`;
  //   console.log('Search pattern:', searchPattern);
    
  //   db.query(query, [searchPattern, searchPattern, searchPattern], (err, results) => {
  //     if (err) {
  //       console.error('Database error:', err);
  //       // Return empty results instead of error
  //       return res.json({
  //         success: true,
  //         data: [],
  //         count: 0
  //       });
  //     }

  //     console.log('Found individuals:', results);

  //     res.json({
  //       success: true,
  //       data: results,
  //       count: results.length
  //     });
  //   });
  // }

//   searchAvailableIndividuals: (req, res) => {
//   const { q } = req.query;

//   console.log('=== SEARCH AVAILABLE INDIVIDUALS CALLED ===');
//   console.log('Search query:', q);
//   console.log('Request URL:', req.originalUrl);

//   if (!q || q.trim() === '') {
//     console.log('Empty query, returning empty array');
//     return res.json({
//       success: true,
//       data: [],
//       count: 0
//     });
//   }

//   // UPDATED QUERY - simpler and more reliable
//   const query = `
//     SELECT id, first_name, last_name, phone, gender, age, photo_url
//     FROM individuals 
//     WHERE is_active = TRUE 
//       AND (family_id IS NULL OR family_id = '')
//       AND (
//         first_name LIKE ? OR 
//         last_name LIKE ? OR 
//         phone LIKE ? OR
//         CONCAT(first_name, ' ', last_name) LIKE ?
//       )
//     ORDER BY first_name, last_name
//     LIMIT 20
//   `;
  
//   const searchPattern = `%${q.trim()}%`;
//   console.log('Search pattern:', searchPattern);
  
//   db.query(query, [searchPattern, searchPattern, searchPattern, searchPattern], (err, results) => {
//     if (err) {
//       console.error('Database error in search:', err);
//       console.error('SQL Error Code:', err.code);
//       console.error('SQL Error Number:', err.errno);
//       console.error('SQL Error Message:', err.sqlMessage);
      
//       // Return empty results instead of error
//       return res.json({
//         success: true,
//         data: [],
//         count: 0,
//         error: err.message
//       });
//     }

//     console.log('Found individuals:', results.length);
//     console.log('Results:', JSON.stringify(results, null, 2));

//     res.json({
//       success: true,
//       data: results,
//       count: results.length
//     });
//   });
// },


searchAvailableIndividuals: (req, res) => {
  const { q } = req.query;

  console.log('=== SEARCH AVAILABLE INDIVIDUALS CALLED ===');
  console.log('Search query:', q);

  if (!q || q.trim() === '') {
    return res.json({
      success: true,
      data: [],
      count: 0
    });
  }

  // MODIFIED: Search ALL active individuals, not just those without family
  const query = `
    SELECT 
      id, 
      first_name, 
      last_name, 
      phone, 
      gender, 
      age, 
      photo_url,
      house_number,  -- Include house number
      family_id      -- Include to see status
    FROM individuals 
    WHERE is_active = TRUE 
      AND (
        LOWER(first_name) LIKE LOWER(?) OR 
        LOWER(last_name) LIKE LOWER(?) OR 
        LOWER(CONCAT(first_name, ' ', last_name)) LIKE LOWER(?) OR
        phone LIKE ? OR
        house_number LIKE ?  -- Search by house number too
      )
    ORDER BY 
      CASE 
        WHEN family_id IS NULL OR family_id = '' THEN 0  -- Prioritize those without family
        ELSE 1
      END,
      first_name, last_name
    LIMIT 20
  `;
  
  const searchPattern = `%${q.trim()}%`;
  console.log('Search pattern:', searchPattern);
  
  db.query(query, [searchPattern, searchPattern, searchPattern, searchPattern, searchPattern], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.json({
        success: true,
        data: [],
        count: 0
      });
    }

    console.log('Found individuals:', results.length);
    console.log('Sample results:', results.slice(0, 3));

    // Filter in application layer: Only show individuals without family
    const availableIndividuals = results.filter(ind => 
      !ind.family_id || ind.family_id === '' || ind.family_id === 0
    );

    console.log('Available individuals (no family):', availableIndividuals.length);

    // Format response without family_id
    const responseData = availableIndividuals.map(({ family_id, ...rest }) => rest);

    res.json({
      success: true,
      data: responseData,
      count: responseData.length,
      debug: {
        total_found: results.length,
        available: availableIndividuals.length
      }
    });
  });
},

// Add this to your familyController.js
checkIndividualsStatus: (req, res) => {
  const query = `
    SELECT 
      COUNT(*) as total,
      SUM(CASE WHEN family_id IS NULL OR family_id = '' THEN 1 ELSE 0 END) as without_family,
      SUM(CASE WHEN family_id IS NOT NULL AND family_id != '' THEN 1 ELSE 0 END) as with_family,
      GROUP_CONCAT(
        CONCAT(id, ':', first_name, ' ', last_name, ':', IFNULL(family_id, 'NULL'))
      ) as sample_data
    FROM individuals 
    WHERE is_active = TRUE
    LIMIT 10
  `;
  
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error:', err);
      return res.status(500).json({ success: false, error: err.message });
    }
    
    const result = results[0];
    console.log('=== INDIVIDUALS STATUS ===');
    console.log('Total individuals:', result.total);
    console.log('Without family:', result.without_family);
    console.log('With family:', result.with_family);
    console.log('Sample data:', result.sample_data);
    
    res.json({
      success: true,
      data: result
    });
  });
}
};

module.exports = familyController;

