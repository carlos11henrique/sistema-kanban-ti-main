// src/routes/setoresRoutes.js
const express = require('express');
const setoresController = require('../controllers/setoresController');

const router = express.Router();

router.get('/', setoresController.getAll);
router.get('/:id', setoresController.getById);
router.post('/', setoresController.create);
router.put('/:id', setoresController.update);
router.delete('/:id', setoresController.delete);

module.exports = router;
