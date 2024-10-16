// src/routes/salasRoutes.js
const express = require('express');
const salasController = require('../controllers/salasController');

const router = express.Router();

router.get('/', salasController.getAll);
router.get('/:id', salasController.getById);
router.post('/', salasController.create);
router.put('/:id', salasController.update);
router.delete('/:id', salasController.delete);

module.exports = router;
