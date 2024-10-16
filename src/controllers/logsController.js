// src/controllers/logsController.js
const logsModel = require('../models/logsModel');

const logsController = {
  getAll: async (req, res) => {
    try {
      const logs = await logsModel.getAll();
      res.json(logs);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar logs' });
    }
  },
  getById: async (req, res) => {
    try {
      const log = await logsModel.getById(req.params.id);
      if (!log) return res.status(404).json({ error: 'Log não encontrado' });
      res.json(log);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar log' });
    }
  },
  create: async (req, res) => {
    try {
      const id = await logsModel.create(req.body);
      res.status(201).json({ id });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar log' });
    }
  },
  delete: async (req, res) => {
    try {
      await logsModel.delete(req.params.id);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar log' });
    }
  },
};

module.exports = logsController;
