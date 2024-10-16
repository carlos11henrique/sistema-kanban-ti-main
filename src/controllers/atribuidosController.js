// src/controllers/atribuidosController.js
const atribuídosModel = require('../models/atribuidosModel');

const atribuídosController = {
  getAll: async (req, res) => {
    try {
      const atribuídos = await atribuídosModel.getAll();
      res.json(atribuidos);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar atribuídos' });
    }
  },
  getById: async (req, res) => {
    try {
      const atribuido = await atribuídosModel.getById(req.params.id);
      if (!atribuido) return res.status(404).json({ error: 'Atribuído não encontrado' });
      res.json(atribuido);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar atribuído' });
    }
  },
  create: async (req, res) => {
    try {
      const id = await atribuídosModel.create(req.body.chamado_id, req.body.setor_id);
      res.status(201).json({ id });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar atribuído' });
    }
  },
  delete: async (req, res) => {
    try {
      await atribuídosModel.delete(req.params.id);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar atribuído' });
    }
  },
};

module.exports = atribuídosController;
