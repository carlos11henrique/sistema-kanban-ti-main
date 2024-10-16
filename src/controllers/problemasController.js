// src/controllers/problemasController.js
const problemasModel = require('../models/problemasModel');

const problemasController = {
  getAll: async (req, res) => {
    try {
      const problemas = await problemasModel.getAll();
      res.json(problemas);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar problemas' });
    }
  },
  getById: async (req, res) => {
    try {
      const problema = await problemasModel.getById(req.params.id);
      if (!problema) return res.status(404).json({ error: 'Problema não encontrado' });
      res.json(problema);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar problema' });
    }
  },
  create: async (req, res) => {
    try {
      const id = await problemasModel.create(req.body.descricao);
      res.status(201).json({ id });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar problema' });
    }
  },
  update: async (req, res) => {
    try {
      await problemasModel.update(req.params.id, req.body.descricao);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar problema' });
    }
  },
  delete: async (req, res) => {
    try {
      await problemasModel.delete(req.params.id);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar problema' });
    }
  },
};

module.exports = problemasController;
