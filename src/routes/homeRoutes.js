// src/models/homeRoutes.js
const express = require('express');
const homeController = require('../controllers/homeController'); // Caminho corrigido

const router = express.Router();

// Rotas para Home
router.get('/total-pendentes', (req, res) => homeController.getTotalChamados('pendente', res));
router.get('/total-andamento', (req, res) => homeController.getTotalChamados('em andamento', res));
router.get('/total-concluidos', (req, res) => homeController.getTotalChamados('concluido', res));
router.get('/tempo-medio-resolucao', homeController.getTempoMedioResolucao);
router.get('/problemas-recorrentes', homeController.getProblemasRecorrentes);
router.get('/distribuicao-categoria', homeController.getDistribuicaoCategoria);
router.get('/chamados-por-mes', homeController.getChamadosPorMes);
router.get('/evolucao-chamados', homeController.getEvolucaoChamados);
router.get('/chamados-degrau', homeController.getChamadosDegrau);

module.exports = router;
