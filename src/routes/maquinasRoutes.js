// src/routes/maquinasRoutes.js
const express = require('express');
const maquinasController = require('../controllers/maquinasController');

const router = express.Router();

router.get('/', maquinasController.getAll);
router.get('/:id', maquinasController.getById);
router.post('/', maquinasController.create);
router.put('/:id', maquinasController.update);
router.delete('/:id', maquinasController.delete);

module.exports = router;
