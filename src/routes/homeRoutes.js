// src/models/homeRoutes.js
const express = require('express');
const homeController = require('../controllers/homeController'); // Caminho corrigido

const router = express.Router();

router.get('/total-pendentes', (req, res) => homeController.getTotalChamados('pendentes', res));
router.get('/total-andamento', (req, res) => homeController.getTotalChamados('em andamento', res));
router.get('/total-concluidos', (req, res) => homeController.getTotalChamados('concluido', res));
router.get('/tempo-medio-resolucao', homeController.getTempoMedioResolucao);
router.get('/problemas-recorrentes', homeController.getProblemasRecorrentes);
router.get('/distribuicao-categoria', homeController.getDistribuicaoCategoria);
router.get('/chamados-por-mes', homeController.getChamadosPorMes);
router.get('/evolucao-chamados', homeController.getEvolucaoChamados);
router.get('/chamados-degrau', homeController.getChamadosDegrau);

router.get('/tempo-medio-resolucao-tm', homeController.getTempoMedioResolucaoTM);
router.get('/problemas-maior-indice', homeController.getProblemasMaiorIndice);
router.get('/tempo-fechamento', homeController.getTempoFechamento);
router.get('/tempo-primeiro-contato', homeController.getTempoPrimeiroContato);


module.exports = router;
