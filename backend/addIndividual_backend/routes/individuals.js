const express = require('express');
const router = express.Router();
const individualController = require('../controllers/individualController');
const { upload } = require('../middleware/uploadMiddleware');

// Routes
router.post('/', upload.single('photo'), individualController.createIndividual);
router.get('/', individualController.getAllIndividuals);
router.get('/stats', individualController.getStatistics);
router.get('/deleted', individualController.getDeletedIndividuals);
router.get('/:id', individualController.getIndividualById);
router.put('/:id', upload.single('photo'), individualController.updateIndividual);
router.delete('/:id', individualController.deleteIndividual);
router.patch('/:id/restore', individualController.restoreIndividual);
router.post('/cleanup-files', individualController.cleanupOrphanedFiles);
router.get('/stats/families', individualController.getFamilyStatistics);

// Test route for debugging
router.get('/test/connection', (req, res) => {
  res.json({
    success: true,
    message: 'Individuals route is working correctly',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;






