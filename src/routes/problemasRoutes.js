// src/routes/problemasRoutes.js
const express = require('express');
const problemasController = require('../controllers/problemasController');

const router = express.Router();

router.get('/', problemasController.getAll);
router.get('/:id', problemasController.getById);
router.post('/', problemasController.create);
router.put('/:id', problemasController.update);
router.delete('/:id', problemasController.delete);

module.exports = router;
