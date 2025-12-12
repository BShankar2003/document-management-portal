const express = require('express');
const router = express.Router();
const controller = require('../controllers/documentsController');

// Routes
router.post('/upload', controller.upload);
router.get('/', controller.list);
router.get('/:id', controller.download);
router.delete('/:id', controller.remove);

module.exports = router;
