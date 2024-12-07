const express = require('express');
const router = express.Router();
const homeTMController = require('../controllers/homeTMController');


router.get('/tempo-medio-resolucao-tm', homeTMController.getTempoMedioResolucao);
router.get('/problemas-maior-indice', homeTMController.getProblemasMaiorIndice);
router.get('/tempo-primeiro-contato', homeTMController.getTempoPrimeiroContato);
router.get('/tempo-fechamento', homeTMController.getTempoFechamento);

module.exports = router;
