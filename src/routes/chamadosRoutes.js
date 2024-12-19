const express = require('express');
const chamadosController = require('../controllers/chamadosController');
const emailController = require('../controllers/emailController');

const router = express.Router();

router.get('/', chamadosController.getAll);

router.get('/:id', chamadosController.getById);

router.get('/:id/detalhes', chamadosController.getChamadoDetalhes);

router.post('/', emailController.criarChamado);

router.put('/:id', chamadosController.update);
router.put('/feedback/:id', chamadosController.updateFeedback);
router.delete('/:id', chamadosController.delete);

module.exports = router;
