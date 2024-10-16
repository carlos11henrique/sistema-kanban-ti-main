// src/controllers/chamadosController.js
const chamadosModel = require('../models/chamadosModel');

const chamadosController = {
  getAll: async (req, res) => {
    try {
      const chamados = await chamadosModel.getAll();
      res.json(chamados);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar chamados' });
    }
  },
  getById: async (req, res) => {
    try {
      const chamado = await chamadosModel.getById(req.params.id);
      if (!chamado) return res.status(404).json({ error: 'Chamado não encontrado' });
      res.json(chamado);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar chamado' });
    }
  },
  create: async (req, res) => {
    try {
      const id = await chamadosModel.create(req.body);
      res.status(201).json({ id });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar chamado' });
    }
  },
  update: async (req, res) => {
    try {
      await chamadosModel.update(req.params.id, req.body);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar chamado' });
    }
  },
  delete: async (req, res) => {
    try {
      await chamadosModel.delete(req.params.id);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar chamado' });
    }
  },
};

module.exports = chamadosController;
