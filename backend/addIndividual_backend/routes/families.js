const express = require('express');
const router = express.Router();
const familyController = require('../controllers/familyController');

// Family routes
router.get('/', familyController.getAllFamilies);
router.get('/stats', familyController.getFamilyStats);
router.get('/search', familyController.searchFamilies);
router.get('/available-individuals', familyController.searchAvailableIndividuals);
router.get('/:id', familyController.getFamilyById);
router.get('/:id/members', familyController.getFamilyMembers);
router.post('/', familyController.createFamily);
router.put('/:id', familyController.updateFamily);
router.delete('/:id', familyController.deleteFamily);
router.post('/:id/members', familyController.addMemberToFamily);
router.delete('/:id/members/:memberId', familyController.removeMemberFromFamily);

// Test route
router.get('/test/connection', (req, res) => {
  res.json({
    success: true,
    message: 'Families route is working',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;