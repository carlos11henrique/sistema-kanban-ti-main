// src/routes/atribuidosRoutes.js
const express = require('express');
const atribuídosController = require('../controllers/atribuidosController');

const router = express.Router();

router.get('/', atribuídosController.getAll);
router.get('/:id', atribuídosController.getById);
router.post('/', atribuídosController.create);
router.delete('/:id', atribuídosController.delete);

module.exports = router;
