// src/routes/chamados_maquinasRoutes.js
const express = require('express');
const chamadosMaquinasController = require('../controllers/chamados_maquinasController');

const router = express.Router();

router.get('/', chamadosMaquinasController.getAll);
router.get('/:id', chamadosMaquinasController.getById);
router.post('/', chamadosMaquinasController.create);
router.delete('/:id', chamadosMaquinasController.delete);

module.exports = router;
