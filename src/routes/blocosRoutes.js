// src/routes/blocosRoutes.js
const express = require('express');
const blocosController = require('../controllers/blocosController');

const router = express.Router();

router.get('/', blocosController.getAll);
router.get('/:id', blocosController.getById);
router.post('/', blocosController.create);
router.put('/:id', blocosController.update);
router.delete('/:id', blocosController.delete);

module.exports = router;
