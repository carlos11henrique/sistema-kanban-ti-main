// src/routes/chamadosRoutes.js
const express = require('express');
const chamadosController = require('../controllers/chamadosController');

const router = express.Router();

router.get('/', chamadosController.getAll);
router.get('/:id', chamadosController.getById);
router.post('/', chamadosController.create);
router.put('/:id', chamadosController.update);
router.delete('/:id', chamadosController.delete);

module.exports = router;
