// src/controllers/maquinasController.js
const maquinasModel = require('../models/maquinasModel');

const maquinasController = {
  getAll: async (req, res) => {
    try {
      const maquinas = await maquinasModel.getAll();
      res.json(maquinas);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar máquinas' });
    }
  },
  getById: async (req, res) => {
    try {
      const maquina = await maquinasModel.getById(req.params.id);
      if (!maquina) return res.status(404).json({ error: 'Máquina não encontrada' });
      res.json(maquina);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar máquina' });
    }
  },
  create: async (req, res) => {
    try {
      const id = await maquinasModel.create(req.body.numero_maquina, req.body.sala_id);
      res.status(201).json({ id });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar máquina' });
    }
  },
  update: async (req, res) => {
    try {
      await maquinasModel.update(req.params.id, req.body.numero_maquina, req.body.sala_id);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar máquina' });
    }
  },
  delete: async (req, res) => {
    try {
      await maquinasModel.delete(req.params.id);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar máquina' });
    }
  },
};

module.exports = maquinasController;
