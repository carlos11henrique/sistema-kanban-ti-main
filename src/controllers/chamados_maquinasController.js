// src/controllers/chamados_maquinasController.js
const chamadosMaquinasModel = require('../models/chamados_maquinasModel');

const chamadosMaquinasController = {
  getAll: async (req, res) => {
    try {
      const chamadosMaquinas = await chamadosMaquinasModel.getAll();
      res.json(chamadosMaquinas);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar chamados máquinas' });
    }
  },
  getById: async (req, res) => {
    try {
      const chamadoMaquina = await chamadosMaquinasModel.getById(req.params.id);
      if (!chamadoMaquina) return res.status(404).json({ error: 'Chamado máquina não encontrado' });
      res.json(chamadoMaquina);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar chamado máquina' });
    }
  },
  create: async (req, res) => {
    try {
      const id = await chamadosMaquinasModel.create(req.body.chamado_id, req.body.maquina_id);
      res.status(201).json({ id });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar chamado máquina' });
    }
  },
  delete: async (req, res) => {
    try {
      await chamadosMaquinasModel.delete(req.params.id);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar chamado máquina' });
    }
  },
};

module.exports = chamadosMaquinasController;
