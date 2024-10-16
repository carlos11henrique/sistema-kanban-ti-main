// src/routes/logsRoutes.js
const express = require('express');
const logsController = require('../controllers/logsController');

const router = express.Router();

router.get('/', logsController.getAll);
router.get('/:id', logsController.getById);
router.post('/', logsController.create);
router.delete('/:id', logsController.delete);

module.exports = router;
