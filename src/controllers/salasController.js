// src/controllers/salasController.js
const salasModel = require('../models/salasModel');

const salasController = {
  getAll: async (req, res) => {
    try {
      const salas = await salasModel.getAll();
      res.json(salas);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar salas' });
    }
  },
  getById: async (req, res) => {
    try {
      const sala = await salasModel.getById(req.params.id);
      if (!sala) return res.status(404).json({ error: 'Sala não encontrada' });
      res.json(sala);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar sala' });
    }
  },
  create: async (req, res) => {
    try {
      const id = await salasModel.create(req.body.numero_sala, req.body.bloco_id);
      res.status(201).json({ id });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar sala' });
    }
  },
  update: async (req, res) => {
    try {
      await salasModel.update(req.params.id, req.body.numero_sala, req.body.bloco_id);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar sala' });
    }
  },
  delete: async (req, res) => {
    try {
      await salasModel.delete(req.params.id);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar sala' });
    }
  },
};

module.exports = salasController;
